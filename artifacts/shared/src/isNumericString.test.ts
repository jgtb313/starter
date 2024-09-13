import { describe, it, expect } from 'vitest'

import { isNumericString } from './isNumericString'

describe('isNumericString', () => {
  it('returns true for a string of only numbers', () => {
    expect(isNumericString('123456')).toBe(true)
  })

  it('returns false for a string containing letters', () => {
    expect(isNumericString('123abc')).toBe(false)
  })

  it('returns false for a string containing special characters', () => {
    expect(isNumericString('123!@#')).toBe(false)
  })

  it('returns false for a string with spaces', () => {
    expect(isNumericString('123 456')).toBe(false)
  })

  it('returns false for an empty string', () => {
    expect(isNumericString('')).toBe(false)
  })

  it('returns false for a string with only spaces', () => {
    expect(isNumericString('     ')).toBe(false)
  })

  it('returns true for a string of zeroes', () => {
    expect(isNumericString('000000')).toBe(true)
  })

  it('returns true for single digit', () => {
    expect(isNumericString('7')).toBe(true)
  })

  it('returns false for a string with decimal numbers', () => {
    expect(isNumericString('123.45')).toBe(false)
  })

  it('returns false for a string with negative numbers', () => {
    expect(isNumericString('-123')).toBe(false)
  })
})
