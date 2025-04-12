import { describe, it, expect } from 'vitest'

import { PhoneSchema } from './phone'

describe('PhoneSchema', () => {
  it('should validate a phone number with correct ISO, DDI and number format', () => {
    const input = {
      iso: 'BR',
      ddi: '+55',
      number: '98991143200',
    }

    const result = PhoneSchema.parse(input)

    expect(result).toEqual(input)
  })

  it('should trim spaces and clear special characters from the phone number', () => {
    const input = {
      iso: 'BR',
      ddi: '+55',
      number: ' (12) 3456-7890 ',
    }

    const result = PhoneSchema.parse(input)

    expect(result).toEqual({
      iso: 'BR',
      ddi: '+55',
      number: '1234567890',
    })
  })

  it('should throw an error for an invalid phone number format', () => {
    const input = {
      iso: 'BR',
      ddi: '+55',
      number: '1234-abc',
    }

    const result = PhoneSchema.safeParse(input)

    expect(result.error?.errors[0].code).toBe('custom')
  })

  it('should throw an error for missing ISO country code', () => {
    const input = {
      iso: '',
      ddi: '+55',
      number: '1234-5678',
    }

    const result = PhoneSchema.safeParse(input)

    expect(result.error?.errors[0].code).toBe('too_small')
    expect(result.error?.errors[0].path[0]).toBe('iso')
  })

  it('should throw an error for missing DDI code', () => {
    const input = {
      iso: 'BR',
      ddi: '',
      number: '1234-5678',
    }

    const result = PhoneSchema.safeParse(input)

    expect(result.error?.errors[0].code).toBe('too_small')
    expect(result.error?.errors[0].path[0]).toBe('ddi')
  })

  it('should throw an error for missing phone number', () => {
    const input = {
      iso: 'BR',
      ddi: '+55',
      number: '',
    }

    const result = PhoneSchema.safeParse(input)

    expect(result.error?.errors[0].code).toBe('too_small')
    expect(result.error?.errors[0].path[0]).toBe('number')
  })
})
