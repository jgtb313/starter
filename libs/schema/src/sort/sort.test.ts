import { describe, expect, it } from 'vitest'

import { SortEnum, SortSchema } from './sort'

describe('SortSchema', () => {
	it('should return empty object for null, undefined or empty string', () => {
		const schema = SortSchema([
			'name',
			'email',
		])

		expect(schema.parse(undefined)).toEqual({})
		expect(schema.parse('')).toEqual({})
	})

	it('should parse a valid asc sort', () => {
		const schema = SortSchema([
			'name',
			'email',
		])
		expect(schema.parse('name:asc')).toEqual({
			name: SortEnum.asc,
		})
	})

	it('should parse a valid desc sort', () => {
		const schema = SortSchema([
			'name',
			'email',
		])
		expect(schema.parse('email:desc')).toEqual({
			email: SortEnum.desc,
		})
	})

	it('should parse a valid sort with multiple fields', () => {
		const schema = SortSchema([
			'name',
			'email',
		])
		expect(schema.parse('name:asc,email:desc')).toEqual({
			name: SortEnum.asc,
			email: SortEnum.desc,
		})
	})
})
