import { z } from 'zod'

import type { Locale } from '@/locale'
import { getLocaleHandler } from '@/locales.schema'

export const setupLocale = (locale: Locale) => {
	const localeHandler = getLocaleHandler(locale)

	z.config({
		customError: localeHandler,
	})
}

setupLocale('en')

export { z }
