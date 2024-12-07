import { apiUrls, StageEnum } from '@starter/config'

export type Env = keyof typeof StageEnum

export const state: State = {
  stage: StageEnum.LOCAL,

  baseURL() {
    return apiUrls[this.stage]
  },

  authorization: undefined,
}

export type State = {
  stage: StageEnum

  baseURL: () => string

  authorization?: string
}
