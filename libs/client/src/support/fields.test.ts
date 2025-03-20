import { describe, it, expect } from 'vitest'

import { formatFields } from './fields'

describe('formatFields', () => {
  it('should return an empty string when fields is undefined', () => {
    expect(formatFields()).toBe('')
  })

  it('should return an empty string when fields is an empty object', () => {
    expect(formatFields({})).toBe('')
  })

  it('should return a single key when fields contain one true value', () => {
    expect(formatFields({ name: true })).toBe('name')
  })

  it('should return multiple keys separated by commas', () => {
    expect(formatFields({ name: true, age: true })).toBe('name,age')
  })

  it('should handle nested objects correctly', () => {
    expect(formatFields({ user: { name: true } })).toBe('user.name')
  })

  it('should handle deeply nested objects', () => {
    expect(formatFields({ user: { profile: { name: true } } })).toBe('user.profile.name')
  })

  it('should ignore falsy values', () => {
    expect(formatFields({ name: true, age: false, address: undefined })).toBe('name')
  })

  it('should use parent option correctly', () => {
    expect(formatFields({ name: true }, { parent: 'user' })).toBe('user.name')
  })

  it('should handle complex nested structures', () => {
    expect(
      formatFields({
        user: {
          profile: {
            name: true,
            address: { city: true, zip: false },
          },
        },
      }),
    ).toBe('user.profile.name,user.profile.address.city')
  })
})
