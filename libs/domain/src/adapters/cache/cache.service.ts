import { Injectable, Inject } from '@nestjs/common'

import { ICache } from '@/ports/cache'

@Injectable()
export class CacheService implements ICache {
  constructor(@Inject('Cache') private readonly cache: ICache) {}

  get: ICache['get'] = (key) => {
    return this.cache.get(key)
  }

  set: ICache['set'] = (key, value, options) => {
    return this.cache.set(key, value, options)
  }

  del: ICache['del'] = (key) => {
    return this.cache.del(key)
  }
}
