import { describe, it, expect } from 'vitest'

import { formatToBRL } from './formatToBRL'

describe('formatToBRL', () => {
  it('should format integers as BRL currency', () => {
    expect(formatToBRL(1234)).toBe('R$ 12,34')
    expect(formatToBRL(56789)).toBe('R$ 567,89')
    expect(formatToBRL(100)).toBe('R$ 1,00')
    expect(formatToBRL(123456)).toBe('R$ 1.234,56')
    expect(formatToBRL(99)).toBe('R$ 0,99')
    expect(formatToBRL(1)).toBe('R$ 0,01')
  })
})
