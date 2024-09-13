import { describe, it, expect } from 'vitest'

import { clearSpecialChars } from './clearSpecialChars'

describe('clearSpecialChars', () => {
  it('removes diacritics and special characters', () => {
    expect(clearSpecialChars('café')).toBe('cafe')
    expect(clearSpecialChars('naïve')).toBe('naive')
    expect(clearSpecialChars('münchen')).toBe('munchen')
    expect(clearSpecialChars('123!@#abc')).toBe('123abc')
    expect(clearSpecialChars('hello world!')).toBe('hello world')
  })

  it('handles empty strings', () => {
    expect(clearSpecialChars('')).toBe('')
  })

  it('ignores valid characters', () => {
    expect(clearSpecialChars('abc123')).toBe('abc123')
    expect(clearSpecialChars('Hello World!')).toBe('Hello World')
  })

  it('removes multiple special characters', () => {
    expect(clearSpecialChars('foo&&&bar@@@')).toBe('foobar')
  })
})
