import { state, State, EnvEnum } from './state'

export const setState = (key: keyof Omit<State, 'baseURL'>, value: string) => {
  if (key === 'authorization') {
    state.authorization = value
  }

  if (key === 'env') {
    state.env = value as EnvEnum
  }
}
