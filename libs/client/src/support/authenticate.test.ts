import { describe, it, expect, beforeEach } from 'vitest'

import { state, setState } from '@/config'
import { authenticate } from './authenticate'

describe('authenticate', () => {
  beforeEach(() => {
    setState('authorization', undefined)
  })

  it('should update the authorization state', () => {
    authenticate('token-123')

    expect(state.authorization).toBe('token-123')
  })

  it('should update the authorization state with a new token', () => {
    authenticate('new-token')

    expect(state.authorization).toBe('new-token')
  })
})
