export enum EnvEnum {
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  PRD = 'prd'
}

export type Env = keyof typeof EnvEnum

export const BASE_URLS = {
  [EnvEnum.LOCAL]: 'http://127.0.0.1:4000',
  [EnvEnum.DEV]: 'https://api.starter.com.br',
  [EnvEnum.STG]: 'https://api.stg.starter.com.br',
  [EnvEnum.PRD]: 'https://api.starter.com.br'
}

export const state: State = {
  env: EnvEnum.LOCAL,

  baseURL() {
    return BASE_URLS[this.env]
  },

  authorization: undefined
}

export type State = {
  env: EnvEnum

  baseURL: () => string

  authorization?: string
}
