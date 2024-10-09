import { beforeAll, afterAll, beforeEach } from 'vitest'
import { connect, disconnect } from '@/adapters/mongodb-in-memory'
import { setupMocks } from '@/adapters/mongodb-in-memory/MongoDB.in-memory.mock'

beforeAll(async () => {
  await connect()
})

afterAll(async () => {
  await disconnect()
})

beforeEach(async () => {
  await setupMocks()
})
