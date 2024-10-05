import { describe, it, expect } from 'vitest'
import { User } from '@starter/schema'

import { getTokenPayload } from './auth'

describe('getTokenPayload', () => {
  it('should return an Auth object with the correct userId', () => {
    const user = { id: 'user-123' } as User

    const result = getTokenPayload(user)

    expect(result).toEqual({ userId: 'user-123' })
  })
})
