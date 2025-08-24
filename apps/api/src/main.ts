import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { config, type StageEnum } from '@starter/config'
import { NestServerHoistingFactory } from '@starter/nestjs-server-hoisting'

import { AppModule } from '@/app.module'

export const bootstrap = async () => {
	const documentationPath = resolve(process.cwd(), 'docs/Documentation.md')
	const documentation = readFileSync(documentationPath, 'utf-8')

	const app = await NestServerHoistingFactory.create(AppModule, {
		port: 4000,

		documentation: {
			title: `${config.name} API`,
			description: documentation,
			favicon: config.logo.darkSymbol,
			server: config.apiUrls[process.env.STAGE as StageEnum],
		},
	})

	return app
}

bootstrap()
