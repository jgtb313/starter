import { describe, it, expect, beforeEach } from 'vitest'
import { StageEnum } from '@starter/config'

import { setState } from './set-state'
import { state } from './state'

describe('setState', () => {
  beforeEach(() => {
    state.authorization = undefined
    state.stage = StageEnum.LOCAL
  })

  it('should update the authorization state', () => {
    setState('authorization', 'token-123')

    expect(state.authorization).toBe('token-123')
  })

  it('should update the stage state', () => {
    setState('stage', StageEnum.PRD)

    expect(state.stage).toBe(StageEnum.PRD)
  })
})
