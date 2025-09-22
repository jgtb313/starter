import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { set } from '@starter/common'
import { config } from '@starter/config'
import type { Request, Response } from 'express'

import { zodSchemaToJSONSchema } from '@/decorators'
import { StateManager } from '@/nestjs-server-hoisting.state'

export type NestServerHoistingSwaggerOptions = {
	title: string
	description: string
	favicon: string
	server: string
}

export const registerSwagger = (
	app: INestApplication,
	options?: NestServerHoistingSwaggerOptions,
) => {
	const state = StateManager.getState()

	const builder = new DocumentBuilder()

	const title = options?.title ?? 'API Reference'
	const description = options?.description ?? 'API Reference'
	const server = options?.server ?? 'http://localhost:6000'

	builder.setTitle(title)
	builder.setDescription(description)

	builder.addServer(server)

	builder.addBearerAuth(
		{
			type: 'http',
			name: 'Bearer',
			scheme: 'Bearer',
			bearerFormat: 'JWT',
		},
		'Bearer',
	)

	Object.values(state.controllers).forEach((controller) => {
		builder.addTag(controller.name, controller.description)
	})

	const builderConfig = builder.build()

	const document = SwaggerModule.createDocument(app, builderConfig)

	const schemas = {}

	Object.values(state.controllers).forEach((controller) => {
		Object.entries(controller.schemas).forEach(
			([schemaName, { schema, description }]) => {
				set(
					schemas,
					schemaName,
					zodSchemaToJSONSchema(
						schema.meta({
							description,
						}),
					),
				)
			},
		)
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
        <html lang="en" data-theme="dark">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>${title}</title>
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

              .sl-prose p {
                margin-bottom: 0px;
              }

              .sl-prose ul {
                margin-top: 0px;
              }
  
              a.sl-flex.sl-items-center.sl-px-4.sl-py-3.sl-border-t, .sl-stack.sl-stack--vertical.sl-stack--3.sl-flex.sl-flex-col.sl-items-stretch, .sl-flex.sl-flex-grow-0.sl-flex-shrink-0.sl-justify-self-end.sl-resize-x {
                display: none;
              }

              button[aria-label="Export"] {
                display: none !important;
              }
            </style>
          </head>
  
          <body>
            <elements-api
              logo="${config.logo.lightSymbol}"
              apiDescriptionUrl="${server}/openapi"
              router="hash"
              layout="responsive"
            />
          </body>
        </html>
      `)
	})
}
