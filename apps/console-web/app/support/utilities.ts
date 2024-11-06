import { EnvEnum } from '@ss/client'

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

const DEFAULT_LIMIT = 10

export const calculatePage = (offset?: number) => {
  if (!offset) {
    return 1
  }

  return Math.floor(offset / DEFAULT_LIMIT) + 1
}

export const calculateOffset = (page: number) => {
  if (page === 1) {
    return 0
  }

  return (page - 1) * DEFAULT_LIMIT
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
