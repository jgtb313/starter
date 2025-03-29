import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import { INestApplication, ConsoleLogger, Type, DynamicModule, ForwardReference } from '@nestjs/common'
import { ExpressAdapter } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { apiReference } from '@scalar/nestjs-api-reference'

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
  log(message: string, context?: string) {
    if (context !== 'InstanceLoader') {
      super.log(message, context)
    }
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
    },
    'Bearer',
  )

  Object.values(state.controllers).forEach((controller) => builder.addTag(controller.name, controller.description))

  const config = builder.build()

  const document = SwaggerModule.createDocument(app, config)

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

  http.get(
    '/reference',
    apiReference({
      theme: 'dark',
      hideModels: false,
      hideDownloadButton: true,
      metaData: {
        title: options.documentation.title,
      },
      favicon: options.documentation.favicon,
      defaultOpenAllTags: true,
      defaultHttpClient: {
        targetKey: 'node',
        clientKey: 'axios',
      },
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      spec: { content: document },
      customCss: [
        '.open-api-client-button { display: none !important; }',
        '.badges { display: none !important; }',
        '.security-scheme-label { font-weight: var(--scalar-semibold); font-size: var(--scalar-mini); color: var(--scalar-color-3); text-transform: uppercase; display: block; }',
        '.scalar-card-header-actions { display: none !important; }',
        '.models-list-item .schema-properties { margin-bottom: 0px !important; }',
        '.darklight-reference-promo { display: none !important; }',
        '.text-sidebar-c-2 { display: none !important; }',
      ].join(''),
    }),
  )

  http.get('/', (_: Request, res: Response) => {
    res.send(options.documentation.title)
  })

  await app.listen(options?.port ?? 3000)

  return app
}

export const NestServerHoistingFactory = {
  create,
}
