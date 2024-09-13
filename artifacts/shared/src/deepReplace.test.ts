// deepReplace.test.ts
import { describe, it, expect } from 'vitest'
import { deepReplace } from './deepReplace' // Substitua pelo caminho correto

describe('deepReplace', () => {
  it('should replace simple key-value pairs', () => {
    const obj = { a: 1, b: 2 }
    const replacements = { a: 10, b: 20 }
    const result = deepReplace(obj, replacements)

    expect(result).toEqual({ a: 10, b: 20 })
  })

  it('should deeply replace nested objects', () => {
    const obj = { a: { b: { c: 1 } } }
    const replacements = { c: 10 }
    const result = deepReplace(obj, replacements)

    expect(result).toEqual({ a: { b: { c: 10 } } })
  })

  it('should handle arrays properly', () => {
    const obj = { a: [1, 2, 3], b: 4 }
    const replacements = { '1': 20 }
    const result = deepReplace(obj, replacements)

    expect(result).toEqual({ a: [1, 20, 3], b: 4 })
  })

  it('should not affect non-existing keys', () => {
    const obj = { a: 1, b: 2 }
    const replacements = { c: 3 }
    const result = deepReplace(obj, replacements)

    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should handle null and non-object values', () => {
    const result = deepReplace(null, { a: 1 })
    expect(result).toBeNull()

    const resultPrimitive = deepReplace(42, { a: 1 })
    expect(resultPrimitive).toBe(42)
  })

  it('should replace keys at multiple levels', () => {
    const obj = { a: { b: { c: { d: 1 } } } }
    const replacements = { d: 10 }
    const result = deepReplace(obj, replacements)

    expect(result).toEqual({ a: { b: { c: { d: 10 } } } })
  })

  it('should replace keys in a deeply nested array of objects', () => {
    const obj = { a: [{ b: 1 }, { b: 2 }] }
    const replacements = { b: 20 }
    const result = deepReplace(obj, replacements)

    expect(result).toEqual({ a: [{ b: 20 }, { b: 20 }] })
  })
})
