import { type Locale, LocaleSchema } from '@/locale'
import { z } from '@/zod'

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
	.meta({
		example: LocaleSchema.options.reduce(
			(acc, locale) => {
				acc[locale] = 'value'
				return acc
			},
			{} as Record<Locale, string>,
		),
	})
export type Translations = z.infer<typeof TranslationsSchema>
