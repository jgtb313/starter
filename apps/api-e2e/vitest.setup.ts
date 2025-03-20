import { beforeAll } from 'vitest'
import { StageEnum } from '@starter/config'
import client from '@starter/client'

beforeAll(async () => {
  client.connect(process.env.STAGE as StageEnum)
})
