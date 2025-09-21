import { describe, expect, it } from 'vitest'

import { PasswordSchema } from './password'

describe('PasswordSchema', () => {
	it('accepts a valid password', () => {
		const input = 'Valid123!'
		const result = PasswordSchema.parse(input)
		expect(result).toBe(input)
	})

	it('rejects passwords shorter than 8 characters', () => {
		const input = 'Ab1!'
		expect(() => PasswordSchema.parse(input)).toThrow()
	})

	it('rejects passwords longer than 64 characters', () => {
		const input = `A1!${'a'.repeat(62)}`
		expect(() => PasswordSchema.parse(input)).toThrow()
	})

	it('rejects passwords without lowercase letters', () => {
		const input = 'PASSWORD123!'
		expect(() => PasswordSchema.parse(input)).toThrow()
	})

	it('rejects passwords without uppercase letters', () => {
		const input = 'password123!'
		expect(() => PasswordSchema.parse(input)).toThrow()
	})

	it('rejects passwords without numbers', () => {
		const input = 'Password!'
		expect(() => PasswordSchema.parse(input)).toThrow()
	})

	it('rejects passwords without special characters', () => {
		const input = 'Password123'
		expect(() => PasswordSchema.parse(input)).toThrow()
	})

	it('trims spaces', () => {
		const input = '  Valid123!  '
		const result = PasswordSchema.parse(input)
		expect(result).toBe('Valid123!')
	})

	it('accepts exactly 8 characters', () => {
		const input = 'Ab1!defg'
		const result = PasswordSchema.parse(input)
		expect(result).toBe(input)
	})

	it.each([
		[
			'shorter than 8 characters',
			'Ab1!',
			'password.minLength',
		],
		[
			'longer than 64 characters',
			`A1!${'a'.repeat(62)}`,
			'password.maxLength',
		],
		[
			'without lowercase letters',
			'PASSWORD123!',
			'password.minLowercase',
		],
		[
			'without uppercase letters',
			'password123!',
			'password.minUppercase',
		],
		[
			'without numbers',
			'Password!',
			'password.minNumbers',
		],
		[
			'without special characters',
			'Password123',
			'password.minSymbols',
		],
	])('returns correct params.code when password is %s', (_, input, code) => {
		const result = PasswordSchema.safeParse(input)
		expect(result.success).toBe(false)
		expect(result.error?.issues[0]).toMatchObject({
			params: {
				code: code,
			},
		})
	})
})
