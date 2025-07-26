import { describe, it, expect } from 'vitest'
import { SortSchema, SortEnum } from './sort'

describe('SortSchema', () => {
  it('should return undefined for null, undefined or empty string', () => {
    const schema = SortSchema(['name', 'email'])

    expect(schema.parse(null)).toBeUndefined()
    expect(schema.parse(undefined)).toBeUndefined()
    expect(schema.parse('')).toBeUndefined()
  })

  it('should parse a valid asc sort', () => {
    const schema = SortSchema(['name', 'email'])
    expect(schema.parse('name:asc')).toEqual({ name: SortEnum.asc })
  })

  it('should parse a valid desc sort', () => {
    const schema = SortSchema(['name', 'email'])
    expect(schema.parse('email:desc')).toEqual({ email: SortEnum.desc })
  })
})
