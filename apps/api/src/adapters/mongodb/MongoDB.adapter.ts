import { env } from '@/config'
import { IDatabase } from '@/ports/database'

import { Repositories } from './modules'
import { client, connect as connection } from './MongoDB.connection'

const MONGODB_URI = env('MONGODB_URI')

const createSession = () => {
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
}

const connect = async () => {
  await connection(MONGODB_URI)
}

const disconnect = async () => {
  await client.close()
}

export const Database: IDatabase = {
  connect,
  disconnect,
  createSession,
  Repositories,
}
