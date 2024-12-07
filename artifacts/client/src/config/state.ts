import { config, StageEnum } from '@starter/config'

export type Env = keyof typeof StageEnum

export const BASE_URLS = {
  [StageEnum.LOCAL]: 'http://127.0.0.1:4000',
  [StageEnum.DEV]: `https://api.dev.${config.domain}`,
  [StageEnum.STG]: `https://api.stg.${config.domain}`,
  [StageEnum.PRD]: `https://api.${config.domain}`,
}

export const state: State = {
  stage: StageEnum.LOCAL,

  baseURL() {
    return BASE_URLS[this.stage]
  },

  authorization: undefined,
}

export type State = {
  stage: StageEnum

  baseURL: () => string

  authorization?: string
}
