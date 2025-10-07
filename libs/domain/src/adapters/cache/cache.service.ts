import { Inject, Injectable } from '@nestjs/common'

import type { ICacheAdapter } from '@/adapters/cache/cache.adapter'
import type { ICache } from '@/ports/cache'

import { CacheSymbol } from './cache.module'

@Injectable()
export class CacheService implements ICache {
	constructor(@Inject(CacheSymbol) private readonly cache: ICacheAdapter) {}

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
