import { describe, it, expect } from 'vitest'
import { StageEnum } from '@starter/config'
import { unsafe } from '@starter/common'

import { state, setState } from '@/config'
import { configure } from './configure'

describe('configure', () => {
  it('should update the stage state', () => {
    setState('stage', unsafe(''))

    configure({ stage: StageEnum.PRD })

    expect(state.stage).toBe(StageEnum.PRD)
  })

  it('should update the authorization state', () => {
    setState('authorization', '')

    configure({ authorization: 'token-123' })

    expect(state.authorization).toBe('token-123')
  })
})
