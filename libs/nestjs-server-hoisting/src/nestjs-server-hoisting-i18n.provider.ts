import { Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { I18nService } from '@starter/nestjs-i18n'
import { type Locale, LocaleSchema } from '@starter/schema'
import type { Request } from 'express'

export const i18nProvider = {
	provide: I18nService,
	scope: Scope.REQUEST,
	inject: [
		REQUEST,
	],
	useFactory: (request: Request) => {
		const acceptLanguage = request.headers['accept-language']
		const parsedAcceptLanguage = LocaleSchema.safeParse(acceptLanguage)
		const locale: Locale = parsedAcceptLanguage.success
			? parsedAcceptLanguage.data
			: 'en'

		return new I18nService(locale)
	},
}
