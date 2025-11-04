import { describe, expect, it } from 'vitest'

import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	PaginationSchemaTransform,
} from './pagination'

describe('PaginationSchema', () => {
	it('should have undefined cursor and limit if not provided', () => {
		const result = PaginationSchema.parse({})
		expect(result.cursor).toBeUndefined()
		expect(result.limit).toBeUndefined()
	})

	it('should accept custom cursor and limit values', () => {
		const result = PaginationSchema.parse({
			cursor: 'abc123',
			limit: 20,
		})
		expect(result.cursor).toBe('abc123')
		expect(result.limit).toBe(20)
	})
})

describe('PaginationSchemaTransform', () => {
	it('should default cursor to null if not provided', () => {
		const result = PaginationSchemaTransform.parse({})
		expect(result.cursor).toBeNull()
	})

	it('should default limit to 10 if not provided', () => {
		const result = PaginationSchemaTransform.parse({})
		expect(result.limit).toBe(10)
	})

	it('should cap limit at 100', () => {
		const result = PaginationSchemaTransform.parse({
			limit: 150,
		})
		expect(result.limit).toBe(100)
	})

	it('should set limit to 10 if a non-positive number is provided', () => {
		const result = PaginationSchemaTransform.parse({
			limit: -5,
		})
		expect(result.limit).toBe(10)
	})

	it('should transform string numbers into numbers', () => {
		const result = PaginationSchemaTransform.parse({
			limit: '30',
		})
		expect(result.limit).toBe(30)
		expect(result.cursor).toBeNull()
	})
})

describe('BasePaginationSchemaOutput', () => {
	it('should allow custom values for meta', () => {
		const result = BasePaginationSchemaOutput.parse({
			values: [],
			meta: {
				nextCursor: 'abc123',
				limit: 10,
			},
		})

		expect(result.meta.nextCursor).toBe('abc123')
		expect(result.meta.limit).toBe(10)
	})
})
