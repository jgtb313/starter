import { describe, it, expect } from 'vitest'

import { isEmail } from './isEmail'

describe('isEmail', () => {
  it('validates a correct email without accents', () => {
    expect(isEmail('test@example.com')).toBe(true)
  })

  it('invalidates an email with accents', () => {
    expect(isEmail('tést@example.com')).toBe(false)
  })

  it('invalidates an email without "@"', () => {
    expect(isEmail('test.example.com')).toBe(false)
  })

  it('invalidates an email without domain', () => {
    expect(isEmail('test@')).toBe(false)
  })

  it('invalidates an email without username', () => {
    expect(isEmail('@example.com')).toBe(false)
  })

  it('invalidates an email with invalid characters', () => {
    expect(isEmail('test@exa!mple.com')).toBe(false)
  })

  it('validates an email with subdomain', () => {
    expect(isEmail('test@mail.subdomain.com')).toBe(true)
  })

  it('validates an email with numeric characters', () => {
    expect(isEmail('12345@example.com')).toBe(true)
  })

  it('invalidates an email with whitespace', () => {
    expect(isEmail('test @example.com')).toBe(false)
  })

  it('invalidates an empty string', () => {
    expect(isEmail('')).toBe(false)
  })
})
