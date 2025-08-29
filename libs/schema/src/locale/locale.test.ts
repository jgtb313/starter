import { describe, expect, it } from 'vitest'

import { type Locale, LocaleSchema } from './locale'

describe('LocaleSchema', () => {
	it('should validate a correctly', () => {
		const input: Locale = 'pt-BR'

		const result = LocaleSchema.safeParse(input)

		expect(result.success).toBe(true)
	})

	it('should invalidate when locale is not a valid locale', () => {
		const input = 'invalid'

		const result = LocaleSchema.safeParse(input)

		expect(result.success).toBe(false)
	})
})
