import { describe, it, expect } from 'vitest'
import { SortSchema, SortHttpSchema, SortEnum } from './sort'

describe('Sort', () => {
  describe('SortSchema', () => {
    it('should allow empty or undefined sort', () => {
      expect(SortSchema.parse({})).toEqual({ sort: undefined })
      expect(SortSchema.parse({ sort: null })).toEqual({ sort: undefined })
      expect(SortSchema.parse({ sort: undefined })).toEqual({ sort: undefined })
    })

    it('should parse a valid record of sort fields', () => {
      const input = {
        sort: {
          name: SortEnum.ascend,
          age: SortEnum.descend,
        },
      }

      const result = SortSchema.parse(input)

      expect(result).toEqual(input)
    })

    it('should fail for invalid enum values', () => {
      const input = {
        sort: {
          name: 'asc',
        },
      }

      const result = SortSchema.safeParse(input)

      expect(result.success).toBe(false)
    })

    it('should fail when sort is an empty object', () => {
      const result = SortSchema.safeParse({ sort: {} })

      expect(result.success).toBe(false)
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
      expect(() => SortHttpSchema.parse({ sort: ':ascend' })).toThrow()
      expect(() => SortHttpSchema.parse({ sort: 'name' })).toThrow()
      expect(() => SortHttpSchema.parse({ sort: 'name:invalid' })).toThrow()
      expect(() => SortHttpSchema.parse({ sort: 'name:asc' })).toThrow()
    })

    it('should allow empty string for sort and fallback to default', () => {
      const result = SortHttpSchema.parse({ sort: '' })

      expect(result).toEqual({ createdAt: SortEnum.descend })
    })

    it('should parse single valid sort entry', () => {
      const result = SortHttpSchema.parse({ sort: 'email:descend' })

      expect(result).toEqual({ email: SortEnum.descend })
    })
  })
})
