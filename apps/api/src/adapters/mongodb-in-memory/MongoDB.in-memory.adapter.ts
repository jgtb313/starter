import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { vi } from 'vitest'

import { client, connect as connection } from '@/adapters/mongodb/MongoDB.connection'
import { IDatabase } from '@/ports/database'
import { RepositoriesInMemory } from './modules'

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

const connect = async () => {
  const server = await MongoMemoryReplSet.create({})

  await connection(server.getUri())
}

const disconnect = async () => {
  await client.close()
}

export const Database: IDatabase = {
  connect,
  disconnect,
  createSession,
  Repositories: RepositoriesInMemory,
}
