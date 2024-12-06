import { config, authRedirectUrls } from './config'

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

export type MakeAuthRedirectUrlOptions = {
  clientId: ClientIdEnum
  stage: StageEnum
  to?: string
  responseType?: 'token'
  scope?: 'user' | 'admin'
  params?: Record<string, string>
}

export const isValidClientId = (value: unknown): value is ClientIdEnum => {
  const isValid = Object.hasOwn(config.oauth.clientIds, value as PropertyKey)

  return isValid
}

export const isValidRedirectUrl = (value: ClientIdEnum, stage: StageEnum, redirectUrl: string): boolean => {
  const clientId = config.oauth.clientIds[value]

  return clientId.redirectUrls[stage] === redirectUrl
}

export const makeAuthRedirectUrl = ({ clientId, stage, to = '', responseType, scope, params = {} }: MakeAuthRedirectUrlOptions) => {
  const qs = Object.entries({
    ...params,
    client_id: clientId,
    redirect_url: config.oauth.clientIds[clientId].redirectUrls[stage],
    response_type: responseType,
    scope,
  })
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return `${authRedirectUrls[stage]}/${to}?${qs}`
}
