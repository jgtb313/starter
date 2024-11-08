import { StageEnum } from '@starter/client'

export const getStage = () => {
  return import.meta.env.VITE_STAGE as StageEnum
}

export const isStage = (stage: StageEnum) => {
  const currentStage = getStage()

  return currentStage === stage
}

export const isProd = () => isStage(StageEnum.PRD)
export const isDev = () => isStage(StageEnum.DEV)
