import { Inject, Injectable } from '@nestjs/common'
import type { RedisClientType } from 'redis'

import type { ICacheAdapter } from '@/ports/cache'

@Injectable()
export class RedisAdapter implements ICacheAdapter {
  constructor(@Inject('REDIS_CLIENT') private readonly client: RedisClientType | undefined) {}

  get: ICacheAdapter['get'] = async (key) => {
    if (!this.client) {
      return
    }

    const value = await this.client.get(key)

    if (!value) {
      return
    }

    return JSON.parse(value)
  }

  set: ICacheAdapter['set'] = async (key, value, options) => {
    if (!this.client) {
      return
    }

    await this.client.set(key, JSON.stringify(value), {
      EX: options?.expiresIn,
    })
  }

  del: ICacheAdapter['del'] = async (key) => {
    if (!this.client) {
      return
    }

    await this.client.del(key)
  }
}
