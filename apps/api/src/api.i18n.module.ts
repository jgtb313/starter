import { nestjsServerHoistingI18nModuleOptions } from '@starter/nestjs-server-hoisting'
import { type I18nService, NestjsI18nModule } from '@starter/nestjs-i18n'
import type { I18nDict } from '@starter/i18n'

import { type DynamicModule, Global, Module } from '@nestjs/common'

import { type I18nAPI, i18nDict } from '@/~i18n/api.i18n'

export const I18nAPISymbol = Symbol('API_I18N')
export type I18nAPIService = I18nService<I18nAPI>

@Global()
@Module({})
export class I18nAPIModule {
	static register<T extends I18nDict>(): DynamicModule {
		const dict = i18nDict as unknown as T

		const i18nModule = NestjsI18nModule.register(
			I18nAPISymbol,
			nestjsServerHoistingI18nModuleOptions(dict),
		)

		return {
			module: I18nAPIModule,
			imports: [
				i18nModule,
			],
			exports: [
				i18nModule,
			],
		}
	}
}
