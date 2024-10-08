import { beforeAll, afterAll, beforeEach } from 'vitest'
import { Database } from '@/adapters/mongodb-in-memory'
import { setupMocks } from '@/adapters/mongodb-in-memory/MongoDB.in-memory.mock'

beforeAll(async () => {
  await Database.connect()
})

afterAll(async () => {
  await Database.disconnect()
})

beforeEach(async () => {
  await setupMocks()
})
