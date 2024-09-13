import { describe, it, expect } from 'vitest'

import { isPhone } from './isPhone'

describe('isPhone', () => {
  it.each([
    { ddi: '+55', iso: 'BR', number: '11987654321', expected: true },
    { ddi: '+55', iso: 'BR', number: '1187654321', expected: true },
    { ddi: '+54', iso: 'AR', number: '1123456789', expected: true },
    { ddi: '+1', iso: 'US', number: '1234567890', expected: true },
    { ddi: '+55', iso: 'BR', number: '123', expected: false },
    { ddi: '+55', iso: 'BR', number: 'abcdefghij', expected: false },
    { ddi: '+54', iso: 'AR', number: '123', expected: false },
    { ddi: '+1', iso: 'US', number: '12345', expected: false }
  ])('should return $expected for iso $iso, ddi $ddi and number $number', ({ ddi, iso, number, expected }) => {
    const result = isPhone({ ddi, iso, number })
    expect(result).toBe(expected)
  })

  it('should return false for unknown country', () => {
    const result = isPhone({ iso: 'XX', ddi: '+999999', number: '1234567890' })

    expect(result).toBe(false)
  })
})
