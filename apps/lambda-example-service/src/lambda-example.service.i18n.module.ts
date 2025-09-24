import { type DynamicModule, Global, Module } from '@nestjs/common'
import { type I18nService, NestjsI18nModule } from '@starter/nestjs-i18n'

import { type I18nLambdaExample, i18nDict } from './~i18n'

export const I18nLambdaExampleSymbol = Symbol('LAMBDA_I18N')
export type I18nLambdaExampleService = I18nService<I18nLambdaExample>

@Global()
@Module({})
export class I18nLambdaExampleModule {
	static register(): DynamicModule {
		const i18nModule = NestjsI18nModule.register('LAMBDA_I18N', {
			dict: i18nDict,
		})

		return {
			module: I18nLambdaExampleModule,
			imports: [
				i18nModule,
			],
			exports: [
				i18nModule,
			],
		}
	}
}
