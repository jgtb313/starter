import { describe, it, expect } from 'vitest'

import { LocationSchema, type Location } from './location'

describe('LocationSchema', () => {
  it('should validate a valid Location', () => {
    const validLocation: Location = {
      lat: '34.052235',
      lng: '-118.243683',
    }

    expect(LocationSchema.parse(validLocation)).toEqual(validLocation)
  })

  it('should fail if lat is missing', () => {
    const invalidLocation = {
      lng: '-118.243683',
    }

    expect(() => LocationSchema.parse(invalidLocation)).toThrow()
  })

  it('should fail if lng is missing', () => {
    const invalidLocation = {
      lat: '34.052235',
    }

    expect(() => LocationSchema.parse(invalidLocation)).toThrow()
  })

  it('should fail if lat or lng are numbers', () => {
    const invalidLocation = {
      lat: 34.052235,
      lng: -118.243683,
    }

    expect(() => LocationSchema.parse(invalidLocation)).toThrow()
  })

  it('should fail if lat or lng are empty strings', () => {
    const invalidLocation: Location = {
      lat: '',
      lng: '',
    }

    expect(() => LocationSchema.parse(invalidLocation)).toThrow()
  })
})
