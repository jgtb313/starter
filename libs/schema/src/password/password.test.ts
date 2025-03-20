import { describe, it, expect } from 'vitest'
import { PasswordSchema } from './password'

describe('PasswordSchema', () => {
  it('should accept valid passwords with at least 8 characters', () => {
    const input = 'validPass123'

    const result = PasswordSchema.parse(input)

    expect(result).toBe(input)
  })

  it('should reject passwords with less than 8 characters', () => {
    const input = 'short'

    expect(() => PasswordSchema.parse(input)).toThrow()
  })

  it('should trim spaces from the password', () => {
    const input = '  passwordWithSpaces  '

    const result = PasswordSchema.parse(input)

    expect(result).toBe('passwordWithSpaces')
  })

  it('should accept passwords with exactly 8 characters', () => {
    const input = '12345678'

    const result = PasswordSchema.parse(input)

    expect(result).toBe(input)
  })
})
