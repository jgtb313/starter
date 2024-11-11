import { createClient, RedisClientType } from 'redis'

import { env } from '@/config'
import { ConflictError } from '@/support/errors'
import { ICache } from '@/ports/cache'

const STAGE = env('STAGE')
const REDIS_URL = env('REDIS_URL')
const REDIS_PASSWORD = env('REDIS_PASSWORD')
const REDIS_DISABLED = env('REDIS_DISABLED') === 'true'

let client: RedisClientType | undefined = undefined

const getClient = (): RedisClientType => {
  if (!client) {
    throw new ConflictError('Redis: Client not connected')
  }

  return client
}

export const Cache: ICache = {
  async connect() {
    if (REDIS_DISABLED) {
      return
    }

    client = createClient({
      url: REDIS_URL,
      password: STAGE !== 'local' ? REDIS_PASSWORD : undefined,
    })

    client.connect().then(() => console.log(`Connected on Redis: ${REDIS_URL}`))
  },

  async get(key) {
    if (REDIS_DISABLED) {
      return
    }

    const value = await getClient().get(key)

    if (!value) {
      return
    }

    return JSON.parse(value)
  },

  async set(key, value, options) {
    if (REDIS_DISABLED) {
      return
    }

    await getClient().set(key, JSON.stringify(value), { EX: options?.expiresIn })
  },

  async disconnect() {
    if (REDIS_DISABLED) {
      return
    }

    await getClient().disconnect()
  },
}
