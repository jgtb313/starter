import { vi, beforeAll, afterAll, beforeEach } from 'vitest'
import { createTestDependencies, setupDatabaseTestMocks } from '@starter/domain'

beforeAll(async () => {
  await createTestDependencies(vi).Database.connect()
})

afterAll(async () => {
  await createTestDependencies(vi).Database.disconnect()
})

beforeEach(async () => {
  await setupDatabaseTestMocks()
})
