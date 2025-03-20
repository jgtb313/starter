import { describe, it, expect, beforeEach } from 'vitest'

import { setState, state } from '@/config'
import { unauthenticate } from './unauthenticate'

describe('unauthenticate', () => {
  beforeEach(() => {
    setState('authorization', 'token-123')
  })

  it('should clear the authorization state', () => {
    unauthenticate()

    expect(state.authorization).toBeUndefined()
  })
})
