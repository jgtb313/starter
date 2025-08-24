import { getDate } from '@starter/common'
import { describe, expect, it } from 'vitest'

import { DateOptionalSchema, DateSchema } from './date'

describe('Date', () => {
	describe('DateSchema', () => {
		it('should validate a valid date string', () => {
			const input = '2024-12-23T10:00:00Z'

			const result = DateSchema.safeParse(input)

			expect(result.success).toBe(true)
			expect(result.data).toEqual(getDate(input))
		})

		it('should validate a valid date string (from Date object)', () => {
			const input = new Date('2024-12-23T10:00:00Z').toISOString()

			const result = DateSchema.safeParse(input)

			expect(result.success).toBe(true)
			expect(result.data).toEqual(getDate(input))
		})

		it('should fail validation for an invalid date string', () => {
			const input = 'invalid-date-string'

			const result = DateSchema.safeParse(input)

			expect(result.success).toBe(false)
		})

		it('should transform valid date string to date object', () => {
			const input = '2024-12-23T10:00:00Z'

			const result = DateSchema.safeParse(input)

			expect(result.data).toEqual(getDate(input))
		})
	})

	describe('DateOptionalSchema', () => {
		it('should allow null value for optional date', () => {
			const input = null

			const result = DateOptionalSchema.safeParse(input)

			expect(result.success).toBe(true)
			expect(result.data).toBeNull()
		})

		it('should validate a valid date string', () => {
			const input = '2024-12-23T10:00:00Z'

			const result = DateOptionalSchema.safeParse(input)

			expect(result.success).toBe(true)
			expect(result.data).toEqual(getDate(input))
		})

		it('should validate a valid date string (from Date object)', () => {
			const input = new Date('2024-12-23T10:00:00Z').toISOString()

			const result = DateOptionalSchema.safeParse(input)

			expect(result.success).toBe(true)
			expect(result.data).toEqual(getDate(input))
		})

		it('should fail validation for an invalid date string', () => {
			const input = 'invalid-date-string'

			const result = DateOptionalSchema.safeParse(input)

			expect(result.success).toBe(false)
		})

		it('should transform valid date string to date object', () => {
			const input = '2024-12-23T10:00:00Z'

			const result = DateOptionalSchema.safeParse(input)

			expect(result.data).toEqual(getDate(input))
		})

		it('should return null for missing date', () => {
			const undefinedDate = undefined

			const result = DateOptionalSchema.safeParse(undefinedDate)

			expect(result.success).toBe(true)
			expect(result.data).toBeNull()
		})
	})
})
