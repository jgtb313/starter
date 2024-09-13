export enum EnvEnum {
  LOCAL = 'local',
  OFFLINE = 'offline',
  DEV = 'dev',
  STG = 'stg',
  PRD = 'prd'
}

export type Env = keyof typeof EnvEnum

export const BASE_URLS = {
  [EnvEnum.LOCAL]: 'http://127.0.0.1:4000',
  [EnvEnum.OFFLINE]: 'http://localhost:4001/dev',
  [EnvEnum.DEV]: 'https://api.smartstockapp.com.br', // https://api.dev.smartstockapp.com.br
  [EnvEnum.STG]: 'https://api.stg.smartstockapp.com.br',
  [EnvEnum.PRD]: 'https://api.smartstockapp.com.br'
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
