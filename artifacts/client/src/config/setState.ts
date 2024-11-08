import { state, State, StageEnum } from './state'

export const setState = (key: keyof Omit<State, 'baseURL'>, value: string) => {
  if (key === 'authorization') {
    state.authorization = value
  }

  if (key === 'stage') {
    state.stage = value as StageEnum
  }
}
