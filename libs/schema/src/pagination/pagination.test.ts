import { describe, expect, it } from 'vitest'

import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	PaginationSchemaTransform,
} from './pagination'

describe('PaginationSchema', () => {
	it('should have undefined offset and limit if not provided', () => {
		const result = PaginationSchema.parse({})
		expect(result.offset).toBeUndefined()
		expect(result.limit).toBeUndefined()
	})

	it('should accept custom offset and limit values', () => {
		const result = PaginationSchema.parse({
			offset: 5,
			limit: 20,
		})
		expect(result.offset).toBe(5)
		expect(result.limit).toBe(20)
	})
})

describe('PaginationSchemaTransform', () => {
	it('should default offset to 0 if not provided', () => {
		const result = PaginationSchemaTransform.parse({})
		expect(result.offset).toBe(0)
	})

	it('should default limit to 10 if not provided', () => {
		const result = PaginationSchemaTransform.parse({})
		expect(result.limit).toBe(10)
	})

	it('should cap limit at 100', () => {
		const result = PaginationSchemaTransform.parse({
			offset: 0,
			limit: 150,
		})
		expect(result.limit).toBe(100)
	})

	it('should set limit to 10 if a non-positive number is provided', () => {
		const result = PaginationSchemaTransform.parse({
			offset: 0,
			limit: -5,
		})
		expect(result.limit).toBe(10)
	})

	it('should transform string numbers into numbers', () => {
		const result = PaginationSchemaTransform.parse({
			offset: '5',
			limit: '30',
		})
		expect(result.offset).toBe(5)
		expect(result.limit).toBe(30)
	})
})

describe('BasePaginationSchemaOutput', () => {
	it('should have default values for meta', () => {
		const result = BasePaginationSchemaOutput.parse({
			values: [],
		})

		expect(result.meta.total).toBeDefined()
		expect(result.meta.offset).toBeDefined()
		expect(result.meta.limit).toBeDefined()
	})

	it('should allow custom values for meta', () => {
		const result = BasePaginationSchemaOutput.parse({
			values: [],
			meta: {
				total: 150,
				offset: 20,
				limit: 10,
			},
		})

		expect(result.meta.total).toBe(150)
		expect(result.meta.offset).toBe(20)
		expect(result.meta.limit).toBe(10)
	})
})
