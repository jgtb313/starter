import { Inject, Injectable } from '@nestjs/common'
import type { IServerlessService } from '@starter/nestjs-serverless-hoisting'

import type { I18nLambdaExampleService } from './lambda-example.service.i18n.module'

export type Service = IServerlessService<{}, number>

@Injectable()
export class LambdaExampleService implements Service {
	constructor(
		@Inject('LAMBDA_I18N')
		private readonly i18nService: I18nLambdaExampleService,
	) {}

	async execute() {
		this.i18nService.current.setLocale('pt-BR')

		console.log(
			this.i18nService.current.hello({
				name: 'John',
			}),
		)

		return 10
	}
}
