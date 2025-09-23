import { Injectable } from '@nestjs/common'
import { createI18n, type I18nDict, type InferI18n } from '@starter/i18n'
import type { Locale } from '@starter/schema'

@Injectable()
export class I18nService<T extends I18nDict> {
	current: InferI18n<T>

	constructor(dict: T, locale: Locale = 'en') {
		this.current = createI18n(dict)
		this.current.setLocale(locale)
	}
}
