import { describe, it, expect } from 'vitest'
import { config, StageEnum } from '@starter/config'

import { state } from '@/config'

describe('state', () => {
  it('should return the correct base URL for LOCAL stage', () => {
    state.stage = StageEnum.LOCAL
    expect(state.baseURL()).toBe(config.apiUrls[StageEnum.LOCAL])
  })

  it('should return the correct base URL for PRD stage', () => {
    state.stage = StageEnum.PRD
    expect(state.baseURL()).toBe(config.apiUrls[StageEnum.PRD])
  })

  it('should return the correct base URL for DEV stage', () => {
    state.stage = StageEnum.DEV
    expect(state.baseURL()).toBe(config.apiUrls[StageEnum.DEV])
  })
})
