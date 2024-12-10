import { createClient, RedisClientType } from 'redis'

import { CreateDependenciesOptions } from '../../domain.dependencies'
import { ConflictError } from '../../domain.errors'
import { ICache } from '../../ports/cache'

let client: RedisClientType | undefined = undefined

const getClient = (): RedisClientType => {
  if (!client) {
    throw new ConflictError('Redis: Client not connected')
  }

  return client
}

export const Cache = ({ env }: CreateDependenciesOptions): ICache => ({
  async connect() {
    if (env.REDIS_DISABLED) {
      return
    }

    client = createClient({
      url: env.REDIS_URL,
      password: env.STAGE !== 'local' ? env.REDIS_PASSWORD : undefined,
    })

    client.connect().then(() => console.log(`Connected on Redis: ${env.REDIS_URL}`))
  },

  async get(key) {
    if (env.REDIS_DISABLED) {
      return
    }

    const value = await getClient().get(key)

    if (!value) {
      return
    }

    return JSON.parse(value)
  },

  async set(key, value, options) {
    if (env.REDIS_DISABLED) {
      return
    }

    await getClient().set(key, JSON.stringify(value), { EX: options?.expiresIn })
  },

  async disconnect() {
    if (env.REDIS_DISABLED) {
      return
    }

    await getClient().disconnect()
  },
})
