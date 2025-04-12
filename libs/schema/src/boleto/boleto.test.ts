import { describe, it, expect } from 'vitest'

import { BoletoSchema } from './boleto'

describe('BoletoSchema', () => {
  it('should pass with valid data', () => {
    const input = {
      url: 'https://example.com/boleto/123',
      instructions: 'Pay before the due date',
      dueDate: '2025-12-01',
    }

    const result = BoletoSchema.safeParse(input)

    expect(result.success).toBe(true)
  })

  it('should fail if url is empty', () => {
    const input = {
      url: '',
      instructions: 'Pay before the due date',
      dueDate: '2025-12-01',
    }

    const result = BoletoSchema.safeParse(input)

    expect(result.success).toBe(false)
  })

  it('should fail if instructions is empty', () => {
    const input = {
      url: 'https://example.com/boleto/123',
      instructions: '',
      dueDate: '2025-12-01',
    }

    const result = BoletoSchema.safeParse(input)

    expect(result.success).toBe(false)
  })

  it('should fail if dueDate is invalid', () => {
    const input = {
      url: 'https://example.com/boleto/123',
      instructions: 'Pay before the due date',
      dueDate: 'invalid-date',
    }

    const result = BoletoSchema.safeParse(input)

    expect(result.success).toBe(false)
  })
})
