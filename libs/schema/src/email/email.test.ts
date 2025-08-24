import { describe, expect, it } from 'vitest'

import { EmailSchema } from './email'

describe('EmailSchema', () => {
	it('should convert email to lowercase', () => {
		const input = 'EXAMPLE@EMAIL.COM'

		const result = EmailSchema.parse(input)

		expect(result).toBe('example@email.com')
	})

	it('should pass with a valid email', () => {
		const input = 'example@email.com'

		const result = EmailSchema.safeParse(input)

		expect(result.success).toBe(true)
	})

	it('should fail for an invalid email format', () => {
		const input = 'invalid-email'

		const result = EmailSchema.safeParse(input)

		expect(result.success).toBe(false)
	})

	it('should fail if the email is an empty string', () => {
		const input = ''

		const result = EmailSchema.safeParse(input)

		expect(result.success).toBe(false)
	})
})
