import { describe, it, expect } from 'vitest'

import { PixSchema } from './pix'

describe('PixSchema', () => {
  it('should pass with valid data', () => {
    const input = {
      qrCode: '00020126400014br.gov.bcb.pix...',
      dueDate: '2025-10-01',
    }

    const result = PixSchema.safeParse(input)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.dueDate).toBeInstanceOf(Date)
    }
  })

  it('should fail if qrCode is empty', () => {
    const input = {
      qrCode: '',
      dueDate: '2025-10-01',
    }

    const result = PixSchema.safeParse(input)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().qrCode?._errors).toContain('String must contain at least 1 character(s)')
    }
  })

  it('should fail if dueDate is invalid', () => {
    const input = {
      qrCode: '00020126400014br.gov.bcb.pix...',
      dueDate: 'invalid-date',
    }

    const result = PixSchema.safeParse(input)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().dueDate?._errors[0]).toMatch(/Invalid/)
    }
  })
})
