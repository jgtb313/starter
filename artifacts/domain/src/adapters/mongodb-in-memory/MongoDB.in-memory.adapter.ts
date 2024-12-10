import { MongoMemoryReplSet } from 'mongodb-memory-server'

import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { client, connect as connection } from '../../adapters/mongodb/MongoDB.connection'
import { Repositories } from '../../adapters/mongodb/modules'
import { IDatabase } from '../../ports/database'
import { RepositoriesInMemory } from './MongoDB.in-memory.collections'

export const DatabaseInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<IDatabase> => ({
  connect: vi.fn(async () => {
    const server = await MongoMemoryReplSet.create({})
    await connection(server.getUri())
  }),

  disconnect: vi.fn(async () => {
    await client.close()
  }),

  createSession: vi.fn(() => {
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
  }),

  Repositories: RepositoriesInMemory(vi, Repositories),
})
