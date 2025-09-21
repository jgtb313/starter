import { describe, expect, it } from 'vitest'

import { type Translations, TranslationsSchema } from './translations'

describe('TranslationsSchema', () => {
	it('should validate a correctly', () => {
		const input: Translations = {
			'pt-BR': 'ptBR',
			en: 'en',
			es: 'es',
		}

		const result = TranslationsSchema.safeParse(input)

		expect(result.success).toBe(true)
	})

	it('should invalidate when locale is not a valid locale', () => {
		const input = {
			invalid: 'invalid',
		}

		const result = TranslationsSchema.safeParse(input)

		expect(result.success).toBe(false)
		expect(result.error?.issues[0]).toMatchObject({
			params: {
				code: 'translations.invalid_locale',
			},
		})
	})
})
