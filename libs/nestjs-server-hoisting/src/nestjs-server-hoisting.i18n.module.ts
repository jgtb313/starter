import { type DynamicModule, Module, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import type { I18nDict } from '@starter/i18n'
import { I18nService, NestjsI18nModule } from '@starter/nestjs-i18n'
import { type Locale, LocaleSchema } from '@starter/schema'
import type { Request } from 'express'

export type NestjsServerHoistingI18nModuleOptions<T extends I18nDict> = {
	provider: string
	dict: T
}

export const nestjsServerHoistingI18nModuleOptions = <T extends I18nDict>(
	dict: T,
) => {
	return {
		scope: Scope.REQUEST,
		inject: [
			REQUEST,
		],
		useFactory: (request: Request) => {
			const acceptLanguage = request.headers['accept-language']
			const parsed = LocaleSchema.safeParse(acceptLanguage)
			const locale: Locale = parsed.success ? parsed.data : 'en'
			return new I18nService(dict, locale)
		},
	}
}

@Module({})
export class NestjsServerHoistingI18nModule {
	static register<T extends I18nDict>(
		options: NestjsServerHoistingI18nModuleOptions<T>,
	): DynamicModule {
		return {
			module: NestjsServerHoistingI18nModule,
			imports: [
				NestjsI18nModule.register(options.provider, options.dict, {
					scope: Scope.REQUEST,
					inject: [
						REQUEST,
					],
					useFactory: (request: Request) => {
						const acceptLanguage = request.headers['accept-language']
						const parsed = LocaleSchema.safeParse(acceptLanguage)
						const locale: Locale = parsed.success ? parsed.data : 'en'
						return new I18nService(options.dict, locale)
					},
				}),
			],
		}
	}
}
