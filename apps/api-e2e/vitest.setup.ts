import { beforeAll } from 'vitest'
import { StageEnum } from '@starter/config'
import client from '@starter/client'

beforeAll(async () => {
  const stage = (process.env.STAGE ?? StageEnum.LOCAL) as StageEnum
  client.connect(stage)
})
