import { config } from './config'

export enum ClientIdEnum {
  APP = 'app',
  CONSOLE = 'console',
}

export enum StageEnum {
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  PRD = 'prd',
}

export const isValidClientId = (value: unknown): value is ClientIdEnum => {
  const isValid = Object.hasOwn(config.oauth.clientIds, value as PropertyKey)

  if (!isValid) {
    throw Error('Invalid clientId')
  }

  return true
}

export const isValidRedirectUri = (value: 'app' | 'console', stage: StageEnum, redirectUrl: string): boolean => {
  const clientId = config.oauth.clientIds[value]

  if (!clientId) {
    return false
  }

  return clientId.redirectUrls[stage] === redirectUrl
}
