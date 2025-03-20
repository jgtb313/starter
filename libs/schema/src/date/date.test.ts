import { describe, it, expect } from 'vitest'
import { getDate } from '@starter/common'

import { DateSchema, DateOptionalSchema } from './date'

describe('Date', () => {
  describe('DateSchema', () => {
    it('should validate a valid date string', () => {
      const validDate = '2024-12-23T10:00:00Z'
      const result = DateSchema.safeParse(validDate)
      expect(result.success).toBe(true)
      expect(result.data).toEqual(getDate(validDate))
    })

    it('should validate a valid Date object', () => {
      const validDate = new Date('2024-12-23T10:00:00Z')
      const result = DateSchema.safeParse(validDate)
      expect(result.success).toBe(true)
      expect(result.data).toEqual(getDate(validDate))
    })

    it('should fail validation for an invalid date string', () => {
      const invalidDate = 'invalid-date-string'
      const result = DateSchema.safeParse(invalidDate)
      expect(result.success).toBe(false)
    })

    it('should transform valid date string to date object', () => {
      const validDate = '2024-12-23T10:00:00Z'
      const result = DateSchema.safeParse(validDate)
      expect(result.data).toEqual(getDate(validDate))
    })
  })

  describe('DateOptionalSchema', () => {
    it('should allow null value for optional date', () => {
      const nullDate = null
      const result = DateOptionalSchema.safeParse(nullDate)
      expect(result.success).toBe(true)
      expect(result.data).toBeNull()
    })

    it('should validate a valid date string', () => {
      const validDate = '2024-12-23T10:00:00Z'
      const result = DateOptionalSchema.safeParse(validDate)
      expect(result.success).toBe(true)
      expect(result.data).toEqual(getDate(validDate))
    })

    it('should validate a valid Date object', () => {
      const validDate = new Date('2024-12-23T10:00:00Z')
      const result = DateOptionalSchema.safeParse(validDate)
      expect(result.success).toBe(true)
      expect(result.data).toEqual(getDate(validDate))
    })

    it('should fail validation for an invalid date string', () => {
      const invalidDate = 'invalid-date-string'
      const result = DateOptionalSchema.safeParse(invalidDate)
      expect(result.success).toBe(false)
    })

    it('should transform valid date string to date object', () => {
      const validDate = '2024-12-23T10:00:00Z'
      const result = DateOptionalSchema.safeParse(validDate)
      expect(result.data).toEqual(getDate(validDate))
    })

    it('should return null for missing date', () => {
      const undefinedDate = undefined
      const result = DateOptionalSchema.safeParse(undefinedDate)
      expect(result.success).toBe(true)
      expect(result.data).toBeNull()
    })
  })
})
