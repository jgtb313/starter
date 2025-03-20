import { describe, it, expect } from 'vitest'

import { unsafe } from './unsafe'

describe('unsafe', () => {
  it.each([
    ['string', 'string'],
    [42, 42],
    [true, true],
    [null, null],
    [undefined, undefined],
    [{ key: 'value' }, { key: 'value' }],
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    [() => 'function', expect.any(Function)],
  ])('should return the same value for input: %s', (input, expected) => {
    const result = unsafe(input)
    if (typeof expected === 'function') {
      expect(result).toEqual(expected())
    } else {
      expect(result).toEqual(expected)
    }
  })
})
