import { describe, it, expect } from 'vitest'

import { BirthdaySchema, BirthdayOptionalSchema } from './birthday'

describe('Birthday', () => {
  describe('BirthdaySchema', () => {
    it('should validate a valid birthday', () => {
      const input = '2000-05-15'
      const result = BirthdaySchema.parse(input)

      expect(result).toEqual(new Date('2000-05-15T15:00:00.000Z'))
    })

    it('should fail validation for a date before 1900', () => {
      const input = '1899-12-31'
      expect(() => BirthdaySchema.parse(input)).toThrow()
    })

    it('should fail validation for an invalid date format', () => {
      const input = 'not-a-date'
      expect(() => BirthdaySchema.parse(input)).toThrow()
    })
  })

  describe('BirthdayOptionalSchema', () => {
    it('should validate a valid optional birthday', () => {
      const input = '1985-10-25'
      const result = BirthdayOptionalSchema.parse(input)
      expect(result).toEqual(new Date('1985-10-25T15:00:00.000Z'))
    })

    it('should allow null values', () => {
      const result = BirthdayOptionalSchema.parse(null)
      expect(result).toBeNull()
    })

    it('should fail validation for a date before 1900', () => {
      const input = '1890-01-01'
      expect(() => BirthdayOptionalSchema.parse(input)).toThrow()
    })

    it('should fail validation for an invalid optional date format', () => {
      const input = 'not-a-date'
      expect(() => BirthdayOptionalSchema.parse(input)).toThrow()
    })
  })
})
