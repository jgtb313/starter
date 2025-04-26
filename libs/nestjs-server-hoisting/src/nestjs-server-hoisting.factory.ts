import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import { ConsoleLogger, INestApplication, Type, DynamicModule, ForwardReference } from '@nestjs/common'
import { ExpressAdapter } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { config } from '@starter/config'
import { set } from '@starter/common'

import { zodSchemaToJSONSchema } from '@/decorators'
import { ResponseInterceptor } from '@/interceptors'
import { ErrorFilter } from '@/filters'
import { StateManager } from '@/nestjs-server-hoisting.state'

export type NestServerHoistingOptions = {
  port?: number
  documentation: {
    title: string
    description: string
    favicon: string
    server: string
  }
}

type IEntryNestModule = Type<any> | DynamicModule | ForwardReference | Promise<IEntryNestModule>

class CustomLogger extends ConsoleLogger {
  instanceLoaders: string[] = []

  log(message: string, context?: string) {
    if (context === 'InstanceLoader') {
      const [moduleName, ...parts] = message.split(' ')

      const cleanMessage = `${moduleName.replace(/\d+/g, '')} ${parts.join(' ')}`

      if (!this.instanceLoaders.includes(cleanMessage)) {
        super.log(cleanMessage, context)
      }

      this.instanceLoaders.push(cleanMessage)

      return
    }

    super.log(message, context)
  }
}

const create = async (entryModule: IEntryNestModule, options: NestServerHoistingOptions) => {
  const app: INestApplication<ExpressAdapter> & { openapiSpec: OpenAPIObject } = await NestFactory.create(entryModule, {
    logger: new CustomLogger(),
  })

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new ErrorFilter())
  app.enableVersioning()
  app.enableCors()

  const state = StateManager.getState()

  const builder = new DocumentBuilder()

  builder.setTitle(options.documentation.title)
  builder.setDescription(options.documentation.description)

  builder.addServer(options.documentation.server)

  builder.addBearerAuth(
    {
      type: 'http',
      name: 'Bearer',
      scheme: 'Bearer',
    },
    'Bearer',
  )

  Object.values(state.controllers).forEach((controller) => builder.addTag(controller.name, controller.description))

  const builderConfig = builder.build()

  const document = SwaggerModule.createDocument(app, builderConfig)

  const schemas = {}

  Object.values(state.controllers).forEach((controller) => {
    Object.entries(controller.schemas).forEach(([schemaName, { schema, description }]) => {
      set(schemas, schemaName, zodSchemaToJSONSchema(schema.meta({ description })))
    })
  })

  set(document.components ?? {}, 'schemas', schemas)

  Object.defineProperty(app, 'openapiSpec', {
    value: document,
    writable: true,
    enumerable: true,
    configurable: true,
  })

  const outputPath = join(__dirname, '../../..', 'openapi-spec.json')

  writeFileSync(outputPath, JSON.stringify(document, null, 2))

  const http = app.getHttpAdapter()

  http.get('/healthz', (_: Request, res: Response) => {
    res.send('Health')
  })

  http.get('/openapi', (_: Request, res: Response) => {
    res.json(document)
  })

  http.get('/reference', (_, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>${options.documentation.title}</title>
          <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
          <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
          <link rel="icon" href="${config.logo.darkSymbol}" type="image/png">
          <style>
            .sl-elements-api {
              display: flex;
              height: 100vh;
              overflow: hidden;
            }

            .sl-elements-api > .sl-flex {
              overflow: hidden;
            }

            .sl-elements-api > .sl-overflow-y-auto {
              flex: 1;
              overflow-y: auto;
            }

            a.sl-flex.sl-items-center.sl-px-4.sl-py-3.sl-border-t {
              display: none;
            }
          </style>
        </head>

        <body>
          <elements-api
            logo="${config.logo.lightSymbol}"
            apiDescriptionUrl="http://localhost:4000/openapi"
            router="hash"
            layout="responsive"
            hideExport
          />
        </body>
      </html>
    `)
  })

  http.get('/', (_: Request, res: Response) => {
    res.send(options.documentation.title)
  })

  await app.listen(options?.port ?? 3000)

  return app
}

export const NestServerHoistingFactory = {
  create,
}
