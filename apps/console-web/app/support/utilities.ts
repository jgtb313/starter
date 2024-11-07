import { EnvEnum } from '@starter/client'

declare const process: {
  env: {
    STAGE: EnvEnum
  }
}

declare global {
  interface Window {
    ENV: {
      STAGE: EnvEnum
    }
  }
}

export const getEnv = () => {
  if (typeof window === 'undefined') {
    return process?.env?.STAGE as EnvEnum
  }

  return window?.ENV?.STAGE as EnvEnum
}

export const isStage = (stage: EnvEnum) => {
  const env = getEnv()

  return env === stage
}

export const isProd = () => isStage(EnvEnum.PRD)
export const isDev = () => isStage(EnvEnum.DEV)
