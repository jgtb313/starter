import type { Locale } from '@starter/schema'
import { createI18n, type I18nDict, type InferI18n } from '@starter/i18n'

import { Injectable } from '@nestjs/common'

@Injectable()
export class I18nService<T extends I18nDict> {
	current: InferI18n<T>

	constructor(dict: T, locale: Locale = 'en') {
		this.current = createI18n(dict, locale)
	}
}
