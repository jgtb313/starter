import { Module } from '@nestjs/common'

import {
	CacheService,
	CacheServiceSymbol,
} from '@/adapters/cache/cache.service'
import { RedisAdapter } from '@/adapters/cache/redis.adapter'
import { RedisModule } from '@/adapters/cache/redis.adapter.module'

@Module({
	imports: [
		RedisModule,
	],
	providers: [
		{
			provide: CacheServiceSymbol,
			useClass: RedisAdapter,
		},
		CacheService,
	],
	exports: [
		CacheService,
	],
})
export class CacheModule {}
