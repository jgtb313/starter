import { describe, it, expect } from 'vitest'

import { CreditCardSchema, BaseCreditCardSchema } from './credit-card'

describe('CreditCardSchema', () => {
  it('should validate a valid credit card number', () => {
    const input = {
      number: '4111111111111111',
      holderName: 'John Doe',
      expirationDate: '10/25',
      cvv: '123',
    }

    const result = CreditCardSchema.safeParse(input)

    expect(result.success).toBe(true)
  })

  it('should invalidate an invalid credit card number', () => {
    const input = {
      number: '1234567890123456',
      holderName: 'John Doe',
      expirationDate: '10/25',
      cvv: '123',
    }

    const result = CreditCardSchema.safeParse(input)

    expect(result.success).toBe(false)
  })

  it('should validate a valid expiration date', () => {
    const input = {
      number: '4111111111111111',
      holderName: 'John Doe',
      expirationDate: '10/25',
      cvv: '123',
    }

    const result = CreditCardSchema.safeParse(input)

    expect(result.success).toBe(true)
  })

  it('should invalidate an expired expiration date', () => {
    const input = {
      number: '4111111111111111',
      holderName: 'John Doe',
      expirationDate: '01/20',
      cvv: '123',
    }

    const result = CreditCardSchema.safeParse(input)

    expect(result.success).toBe(false)
  })

  it('should validate a valid CVV', () => {
    const input = {
      number: '4111111111111111',
      holderName: 'John Doe',
      expirationDate: '10/25',
      cvv: '123',
    }

    const result = CreditCardSchema.safeParse(input)

    expect(result.success).toBe(true)
  })

  it('should invalidate an incorrect CVV', () => {
    const input = {
      number: '4111111111111111',
      holderName: 'John Doe',
      expirationDate: '10/25',
      cvv: '9999',
    }

    const result = CreditCardSchema.safeParse(input)

    expect(result.success).toBe(false)
  })

  it('should validate BaseCreditCardSchema without cvv', () => {
    const input = {
      number: '4111111111111111',
      holderName: 'John Doe',
      expirationDate: '10/25',
    }

    const result = BaseCreditCardSchema.safeParse(input)

    expect(result.success).toBe(true)
  })

  it('should invalidate BaseCreditCardSchema with invalid expiration date format', () => {
    const input = {
      number: '4111111111111111',
      holderName: 'John Doe',
      expirationDate: '1025',
    }

    const result = BaseCreditCardSchema.safeParse(input)

    expect(result.success).toBe(false)
  })
})
