import { describe, it, expect } from 'vitest'

import { SortSchema, SortHttpSchema, SortEnum } from './sort'

describe('Sort', () => {
  describe('SortSchema', () => {
    it('should allow empty or undefined sort', () => {
      expect(SortSchema.parse({})).toEqual({})
      expect(SortSchema.parse({ sort: null })).toEqual({})
      expect(SortSchema.parse({ sort: undefined })).toEqual({})
    })

    it('should parse a valid record of sort fields', () => {
      const input = {
        sort: { name: SortEnum.ascend, age: SortEnum.descend },
      }

      const result = SortSchema.parse(input)

      expect(result).toEqual(input)
    })
  })

  describe('SortHttpSchema', () => {
    it('should return default sort when no sort is provided', () => {
      const result = SortHttpSchema.parse({})

      expect(result).toEqual({ createdAt: SortEnum.descend })
    })

    it('should parse valid sort string', () => {
      const result = SortHttpSchema.parse({ sort: 'name:ascend,age:descend' })

      expect(result).toEqual({
        name: SortEnum.ascend,
        age: SortEnum.descend,
      })
    })

    it('should throw an error for invalid sort format', () => {
      expect(() => SortHttpSchema.parse({ sort: ':ascend' })).toThrow(expect.objectContaining({ errors: expect.any(Array) }))
      expect(() => SortHttpSchema.parse({ sort: 'name,age:unknown' })).toThrow(expect.objectContaining({ errors: expect.any(Array) }))
    })

    it('should allow empty string for sort', () => {
      const result = SortHttpSchema.parse({ sort: '' })

      expect(result).toEqual({ createdAt: SortEnum.descend })
    })
  })
})
