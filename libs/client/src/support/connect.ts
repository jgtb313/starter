import { StageEnum } from '@starter/config'

import { setState } from '@/config'

export const connect = (stage: StageEnum) => {
  setState('stage', stage)
}
