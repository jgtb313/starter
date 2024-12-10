import { CreateDependenciesOptions } from '@/domain.types'
import { IDatabase } from '@/ports/database'

import { Repositories } from './modules'
import { client, connect as connection } from './MongoDB.connection'

export const Database = ({ env }: CreateDependenciesOptions): IDatabase => ({
  connect: async () => {
    await connection(env.MONGODB_URI)
  },

  disconnect: async () => {
    await client.close()
  },

  createSession: () => {
    const session = client.startSession()

    session.startTransaction()

    return {
      value: session as unknown,

      commit: async () => {
        await session.commitTransaction()
        await session.endSession()
      },

      rollback: async () => {
        await session.abortTransaction()
        await session.endSession()
      },
    }
  },

  Repositories,
})
