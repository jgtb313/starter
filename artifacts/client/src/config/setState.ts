import { StageEnum } from '@starter/config'

import { state, State } from './state'

export const setState = <K extends keyof Omit<State, 'baseURL'>>(key: K, value: State[K]) => {
  if (key === 'authorization') {
    state.authorization = value
  }

  if (key === 'stage') {
    state.stage = value as StageEnum
  }
}
