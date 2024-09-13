import { env } from '@/config'
import { IDatabase } from '@/ports/database'

import { Repositories } from './modules'
import { client, MongoDB } from './MongoDB.support'

const MONGODB_URL = env('MONGODB_URL')

const createSession = async () => {
  const session = MongoDB.startSession()

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
    }
  }
}

const connect = async () => {
  await MongoDB.connect(MONGODB_URL)
}

const disconnect = async () => {
  await client.close()
}

export const Database: IDatabase = {
  connect,
  disconnect,
  createSession,
  Repositories
}
