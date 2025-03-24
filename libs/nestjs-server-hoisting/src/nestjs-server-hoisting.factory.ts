import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import { INestApplication, ConsoleLogger, Type, DynamicModule, ForwardReference } from '@nestjs/common'
import { ExpressAdapter } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { apiReference } from '@scalar/nestjs-api-reference'
import { OpenAPIV3_1 } from 'openapi-types'

import { ResponseInterceptor } from '@/interceptors'
import { ErrorFilter } from '@/filters'
import { StateManager } from '@/nestjs-server-hoisting.state'

export type NestServerHoistingOptions = {
  port?: number
  openapi?: any
}

type IEntryNestModule = Type<any> | DynamicModule | ForwardReference | Promise<IEntryNestModule>

class CustomLogger extends ConsoleLogger {
  log(message: string, context?: string) {
    if (context !== 'InstanceLoader') {
      super.log(message, context)
    }
  }
}

const create = async (entryModule: IEntryNestModule, options?: NestServerHoistingOptions) => {
  const app: INestApplication<ExpressAdapter> & { openapiSpec: OpenAPIV3_1.Document } = await NestFactory.create(entryModule, {
    logger: new CustomLogger(),
  })

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new ErrorFilter())
  app.enableVersioning()
  app.enableCors()

  const state = StateManager.getState()

  const builder = new DocumentBuilder()

  builder.addBearerAuth(
    {
      type: 'http',
      name: 'Bearer',
    },
    'Bearer',
  )
  builder.setTitle(options?.openapi.title)
  builder.setDescription(options?.openapi.description)

  Object.values(state.controllers).forEach((controller) => builder.addTag(controller.name, controller.description))

  const config = builder.build()

  const document = SwaggerModule.createDocument(app, config)

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
        title: options?.openapi?.title,
      },
      favicon: options?.openapi?.favicon,
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
    res.send(options?.openapi?.title ?? 'API')
  })

  await app.listen(options?.port ?? 3000)

  return app
}

export const NestServerHoistingFactory = {
  create,
}
