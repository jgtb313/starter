import {
	ConsoleLogger,
	type DynamicModule,
	type ForwardReference,
	type INestApplication,
	type Type,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { ExpressAdapter } from '@nestjs/platform-express'
import type { Request, Response } from 'express'

import { ErrorFilter } from '@/filters'
import { PaginationInterceptor, ResponseInterceptor } from '@/interceptors'
import { registerSwagger } from '@/nestjs-server-hoisting.swagger'

export type NestServerHoistingOptions = {
	port?: number
	documentation: {
		title: string
		description: string
		favicon: string
		server: string
	}
}

type IEntryNestModule =
	| Type<any>
	| DynamicModule
	| ForwardReference
	| Promise<IEntryNestModule>

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

const create = async (
	entryModule: IEntryNestModule,
	options: NestServerHoistingOptions,
) => {
	const PORT = options.port ?? 3000

	const app: INestApplication<ExpressAdapter> = await NestFactory.create(
		entryModule,
		{
			logger: new CustomLogger(),
		},
	)

	app.useGlobalInterceptors(new PaginationInterceptor())
	app.useGlobalInterceptors(new ResponseInterceptor())
	app.useGlobalFilters(new ErrorFilter())
	app.enableVersioning()
	app.enableCors()

	registerSwagger(app, options.documentation)

	const http = app.getHttpAdapter()

	http.get('/healthz', (_: Request, res: Response) => {
		res.send('Health')
	})

	http.get('/', (_: Request, res: Response) => {
		res.send(options.documentation.title)
	})

	await app.listen(PORT)

	return app
}

export const NestServerHoistingFactory = {
	create,
}
