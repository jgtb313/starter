import { Module } from '@nestjs/common'

import { CacheService } from '@/adapters/cache/cache.service'
import { RedisAdapter } from '@/adapters/cache/redis.adapter'
import { RedisModule } from '@/adapters/cache/redis.adapter.module'

export const CacheSymbol = Symbol('Cache')

@Module({
	imports: [
		RedisModule,
	],
	providers: [
		{
			provide: CacheSymbol,
			useClass: RedisAdapter,
		},
		CacheService,
	],
	exports: [
		CacheService,
	],
})
export class CacheModule {}
