import { describe, expect, it } from 'vitest'

import {
	BasePaymentCardSchema,
	type PaymentCard,
	PaymentCardSchema,
} from './payment-card'

describe('PaymentCard', () => {
	const card: PaymentCard = {
		number: '4111111111111111',
		holderName: 'John Doe',
		expirationDate: '10/30',
		cvv: '123',
		token: 'tok_1N6zXeF6L3aBcD9X3gT2V9pQ',
	}

	describe('PaymentCardSchema', () => {
		it('should validate a valid credit card number', () => {
			const input = {
				...card,
			}

			const result = PaymentCardSchema.safeParse(input)

			expect(result.success).toBe(true)
		})

		it('should invalidate an invalid credit card number', () => {
			const input = {
				...card,
				number: '1234567890123456',
			}

			const result = PaymentCardSchema.safeParse(input)

			expect(result.success).toBe(false)
		})

		it('should validate a valid expiration date', () => {
			const input = {
				...card,
			}

			const result = PaymentCardSchema.safeParse(input)

			expect(result.success).toBe(true)
		})

		it('should invalidate an expired expiration date', () => {
			const input = {
				...card,
				expirationDate: '01/20',
			}

			const result = PaymentCardSchema.safeParse(input)

			expect(result.success).toBe(false)
		})

		it('should validate a valid CVV', () => {
			const input = {
				...card,
			}

			const result = PaymentCardSchema.safeParse(input)

			expect(result.success).toBe(true)
		})

		it('should invalidate an incorrect CVV', () => {
			const input = {
				...card,
				cvv: '9999',
			}

			const result = PaymentCardSchema.safeParse(input)

			expect(result.success).toBe(false)
		})
	})

	describe('BasePaymentCardSchema', () => {
		it('should validate BasePaymentCardSchema without cvv', () => {
			const input = {
				number: card.number,
				holderName: card.holderName,
				expirationDate: card.expirationDate,
				token: card.token,
			}

			const result = BasePaymentCardSchema.safeParse(input)

			expect(result.success).toBe(true)
		})

		it('should invalidate BasePaymentCardSchema with invalid expiration date format', () => {
			const input = {
				number: card.number,
				holderName: card.holderName,
				expirationDate: '1025',
				token: card.token,
			}

			const result = BasePaymentCardSchema.safeParse(input)

			expect(result.success).toBe(false)
		})
	})
})
