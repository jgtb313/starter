import { describe, it, expect } from 'vitest'

import { PixSchema, BasePix } from './pix'

describe('PixSchema', () => {
  it('should validate a correct Pix object', () => {
    const input: BasePix = {
      qrCodeUrl: 'https://example.com/pix/qrcode',
      expiresAt: '2025-10-01T00:00:00.000Z',
    }

    const result = PixSchema.safeParse(input)

    expect(result.success).toBe(true)
    expect(result.success && result.data.expiresAt).toBeInstanceOf(Date)
  })

  it('should invalidate when qrCodeUrl is empty', () => {
    const input: BasePix = {
      qrCodeUrl: '',
      expiresAt: '2025-10-01T00:00:00.000Z',
    }

    const result = PixSchema.safeParse(input)

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toMatch(/Invalid url/i)
  })

  it('should invalidate when expiresAt is not a valid ISO date string', () => {
    const input: BasePix = {
      qrCodeUrl: 'https://example.com/pix/qrcode',
      expiresAt: 'not-a-date',
    }

    const result = PixSchema.safeParse(input)

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toMatch(/Invalid/i)
  })
})
