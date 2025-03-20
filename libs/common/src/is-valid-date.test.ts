import { describe, it, expect } from 'vitest'

import { isValidDate } from './is-valid-date'

describe('isValidDate', () => {
  it('returns true for valid Date object', () => {
    expect(isValidDate(new Date())).toBe(true)
    expect(isValidDate(new Date('2023-01-01'))).toBe(true)
  })

  it('returns false for invalid Date object', () => {
    expect(isValidDate(new Date('invalid'))).toBe(false)
  })

  it('returns true for valid date string in ISO format', () => {
    expect(isValidDate('2023-01-01')).toBe(true)
    expect(isValidDate('2023-12-31T23:59:59')).toBe(true)
  })

  it('returns true for valid date string in dd/MM/yyyy format', () => {
    expect(isValidDate('01/01/2023')).toBe(true)
    expect(isValidDate('31/12/2023')).toBe(true)
  })

  it('returns false for invalid date strings', () => {
    expect(isValidDate('invalid')).toBe(false)
    expect(isValidDate('2023-13-01')).toBe(false) // Invalid month
    expect(isValidDate('32/01/2023')).toBe(false) // Invalid day
  })

  it('handles edge cases correctly', () => {
    expect(isValidDate('29/02/2020')).toBe(true) // Leap year
    expect(isValidDate('29/02/2021')).toBe(false) // Not a leap year
    expect(isValidDate('31/04/2023')).toBe(false) // April has 30 days
  })

  it('returns false for non-date inputs', () => {
    expect(isValidDate('hello')).toBe(false)
    expect(isValidDate('')).toBe(false)
  })

  it('handles different date formats correctly', () => {
    expect(isValidDate('2023-01-01T00:00:00.000Z')).toBe(true) // ISO with timezone
    expect(isValidDate('01/01/2023T00:00:00')).toBe(true) // DD/MM/YYYY with time
    expect(isValidDate('01/01/2023 00:00:00')).toBe(true) // DD/MM/YYYY with time
  })
})
