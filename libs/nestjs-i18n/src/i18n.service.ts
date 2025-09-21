import { Injectable } from '@nestjs/common'
import { i18n } from '@starter/i18n'
import type { Locale } from '@starter/schema'

@Injectable()
export class I18nService {
	current: ReturnType<typeof i18n.create>

	constructor(locale: Locale = 'en') {
		this.current = i18n.create(locale)
	}
}
