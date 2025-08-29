import { z } from 'zod'

import type { Locale } from '@/locale'
import { en, es, ptBR } from '@/locales.schema'

export const setupLocale = (locale: Locale) => {
	const localeSchema: Record<Locale, z.core.$ZodErrorMap> = {
		en,
		es,
		'pt-BR': ptBR,
	}

	z.config({
		customError: localeSchema[locale],
	})
}

export { z }
