import { Inject, Injectable } from '@nestjs/common'

import type { ICache, ICacheAdapter } from '@/ports/cache'

@Injectable()
export class CacheService implements ICache {
	constructor(@Inject('Cache') private readonly cache: ICacheAdapter) {}

	get: ICache['get'] = (key) => {
		return this.cache.get(key)
	}

	set: ICache['set'] = (key, value, options) => {
		return this.cache.set(key, value, options)
	}

	delete: ICache['delete'] = (key) => {
		return this.cache.del(key)
	}
}
