import { join } from 'node:path'
import { writeFileSync } from 'node:fs'
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { config } from '@starter/config'
import { set } from '@starter/common'

import { zodSchemaToJSONSchema } from '@/decorators'
import { StateManager } from '@/nestjs-server-hoisting.state'

export type NestServerHoistingSwaggerOptions = {
  title: string
  description: string
  favicon: string
  server: string
}

export const registerSwagger = (app: INestApplication, options: NestServerHoistingSwaggerOptions) => {
  const state = StateManager.getState()

  const builder = new DocumentBuilder()

  builder.setTitle(options.title)
  builder.setDescription(options.description)

  builder.addServer(options.server)

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

  const http = app.getHttpAdapter()

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
            <title>${options.title}</title>
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
              apiDescriptionUrl="${options.server}/openapi"
              router="history"
              layout="responsive"
              hideExport
            />
          </body>
        </html>
      `)
  })

  const outputPath = join(__dirname, '../../..', 'openapi-spec.json')

  writeFileSync(outputPath, JSON.stringify(document, null, 2))
}
