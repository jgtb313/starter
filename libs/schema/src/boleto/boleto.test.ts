import { describe, expect, it } from 'vitest'

import { BoletoSchema } from './boleto'

describe('BoletoSchema', () => {
	it('should pass with valid data', () => {
		const input = {
			url: 'https://example.com/boleto/123',
			expiresAt: '2025-12-01T00:00:00.000Z',
		}

		const result = BoletoSchema.safeParse(input)

		expect(result.success).toBe(true)
	})

	it('should fail if url is empty', () => {
		const input = {
			url: '',
			expiresAt: '2025-12-01T00:00:00.000Z',
		}

		const result = BoletoSchema.safeParse(input)

		expect(result.success).toBe(false)
		expect(result.error?.issues[0].code).toBe('invalid_format')
	})

	it('should fail if expiresAt is invalid', () => {
		const input = {
			url: 'https://example.com/boleto/123',
			expiresAt: 'invalid-date',
		}

		const result = BoletoSchema.safeParse(input)

		expect(result.success).toBe(false)
		expect(result.error?.issues[0].code).toBe('invalid_format')
	})
})
