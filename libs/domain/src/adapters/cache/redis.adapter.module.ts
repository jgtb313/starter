import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { createClient, type RedisClientType } from 'redis'

export const RedisClientSymbol = Symbol('RedisClient')

let redisClient: RedisClientType | undefined

@Module({
	imports: [
		ConfigModule,
	],
	providers: [
		{
			provide: RedisClientSymbol,
			useFactory: async (configService: ConfigService) => {
				const logger = new Logger('RedisClient')

				const REDIS_DISABLED =
					configService.get<string>('REDIS_DISABLED') === 'true'

				if (REDIS_DISABLED) {
					return
				}

				if (redisClient) {
					return redisClient
				}

				const STAGE = configService.get<string>('STAGE')
				const REDIS_URL = configService.get<string>('REDIS_URL')
				const REDIS_PASSWORD = configService.get<string>('REDIS_PASSWORD')

				redisClient = createClient({
					url: REDIS_URL,
					password: STAGE !== 'local' ? REDIS_PASSWORD : undefined,
				})

				await redisClient.connect()

				logger.log(`Connected to Redis: ${REDIS_URL}.`)

				return redisClient
			},
			inject: [
				ConfigService,
			],
		},
	],
	exports: [
		RedisClientSymbol,
	],
})
export class RedisModule {}
