import { type DynamicModule, Global, Module } from '@nestjs/common'
import type { I18nDict } from '@starter/i18n'
import { type I18nService, NestjsI18nModule } from '@starter/nestjs-i18n'
import { nestjsServerHoistingI18nModuleOptions } from '@starter/nestjs-server-hoisting'
// import { en, es, type I18nApi, ptBR } from 'i18n/i18n.api'

export const en = {
	hello: 'Hello {name:string}',
} as const
export type Translations = {
	[K in keyof typeof en]: string
}

export const es: Translations = {
	hello: 'Hola {name:string}',
}

export const ptBR: Translations = {
	hello: 'Olá {name:string}',
}

export type I18nApi = {
	en: typeof en
	es: typeof es
	'pt-BR': typeof ptBR
}

export const I18nAPISymbol = Symbol('API_I18N')
export type I18nAPIService = I18nService<I18nApi>

@Global()
@Module({})
export class I18nAPIModule {
	static register<T extends I18nDict>(): DynamicModule {
		const dict = {
			en,
			es,
			'pt-BR': ptBR,
		} as unknown as T

		const i18nModule = NestjsI18nModule.register(
			'API_I18N',
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
