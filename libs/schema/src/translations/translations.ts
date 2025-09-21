import { z } from '@/zod'

import { LocaleSchema } from '@/locale'

export const TranslationsSchema = z
	.record(z.string().min(1), z.string().min(1))
	.refine(
		(value) => {
			return (
				Object.keys(value).length <= LocaleSchema.options.length &&
				Object.keys(value).every((key) => LocaleSchema.safeParse(key).success)
			)
		},
		{
			params: {
				code: 'translations.invalid_locale',
			},
		},
	)
export type Translations = z.infer<typeof TranslationsSchema>
