import { z } from 'zod'

import type { Locale } from '@/locale'
import { extendI18nDict, zodI18nResolver } from '@/zod.i18n.resolver'

export const setupZodI18n = (locale: Locale) => {
	const resolver = zodI18nResolver(locale)

	z.config({
		customError: resolver as z.core.$ZodErrorMap,
	})
}

setupZodI18n('en')

export { z, extendI18nDict }
