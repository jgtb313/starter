import { describe, it, expect } from 'vitest'

import { formatZipcode } from './formatZipcode'

describe('formatZipcode', () => {
  it('formats valid zipcode correctly', () => {
    const result = formatZipcode('12345678')
    expect(result).toBe('12345-678')
  })

  it('formats zipcode with existing dash', () => {
    const result = formatZipcode('12345-678')
    expect(result).toBe('12345-678')
  })

  it('formats zipcode with extra characters', () => {
    const result = formatZipcode('12-345678')
    expect(result).toBe('12345-678')
  })
})
