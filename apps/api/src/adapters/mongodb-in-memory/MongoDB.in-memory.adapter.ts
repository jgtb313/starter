import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { client, connect as connection } from '@/adapters/mongodb/MongoDB.connection'
import { IDatabase } from '@/ports/database'
import { RepositoriesInMemory } from './MongoDB.in-memory.collections'

const createSession = vi.fn(() => {
  const session = client.startSession()

  session.startTransaction()

  return {
    value: session as unknown,

    commit: vi.fn(async () => {
      await session.commitTransaction()
      await session.endSession()
    }),

    rollback: vi.fn(async () => {
      await session.abortTransaction()
      await session.endSession()
    }),
  }
})

export const connect = async () => {
  const server = await MongoMemoryReplSet.create({})

  await connection(server.getUri())
}

export const disconnect = async () => {
  await client.close()
}

export const DatabaseInMemory: {
  createSession: SetupTestDependencies<IDatabase['createSession']>
  Repositories: SetupTestDependencies<IDatabase['Repositories']>
} = {
  createSession,
  Repositories: RepositoriesInMemory,
}
