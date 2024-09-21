import { describe, it, expect } from 'vitest'

import { slugify } from './slugify'

describe('slugify', () => {
  it('should convert a string to a slug format', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('  Extra   Spaces  ')).toBe('extra-spaces')
    expect(slugify('Special Characters #@!')).toBe('special-characters')
    expect(slugify('Café')).toBe('cafe')
    expect(slugify('— Em Dash —')).toBe('em-dash')
    expect(slugify('Multiple    --    Dashes')).toBe('multiple-dashes')
  })

  it('should handle empty strings', () => {
    expect(slugify('')).toBe('')
  })

  it('should handle strings with only special characters', () => {
    expect(slugify('!@#$%^&*()')).toBe('')
  })

  it('should handle leading and trailing whitespace', () => {
    expect(slugify('   Leading and Trailing   ')).toBe('leading-and-trailing')
  })

  it('should handle Unicode characters', () => {
    expect(slugify('Äpfel und Über')).toBe('apfel-und-uber')
  })
})
