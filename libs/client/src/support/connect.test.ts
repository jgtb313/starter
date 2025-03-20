import { describe, it, expect, beforeEach } from 'vitest'
import { StageEnum } from '@starter/config'
import { unsafe } from '@starter/common'

import { setState, state } from '@/config'
import { connect } from './connect'

describe('connect', () => {
  beforeEach(() => {
    setState('stage', unsafe(undefined))
  })

  it('should update the stage state', () => {
    connect(StageEnum.PRD)

    expect(state.stage).toBe(StageEnum.PRD)
  })

  it('should update the stage state with a different value', () => {
    connect(StageEnum.DEV)

    expect(state.stage).toBe(StageEnum.DEV)
  })
})
