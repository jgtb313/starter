import { Module, Logger } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { createClient } from 'redis'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('RedisClient')

        const REDIS_DISABLED = configService.get<string>('REDIS_DISABLED') === 'true'

        if (REDIS_DISABLED) {
          return
        }

        const STAGE = configService.get<string>('STAGE')
        const REDIS_URL = configService.get<string>('REDIS_URL')
        const REDIS_PASSWORD = configService.get<string>('REDIS_PASSWORD')

        const client = createClient({
          url: REDIS_URL,
          password: STAGE !== 'local' ? REDIS_PASSWORD : undefined,
        })

        await client.connect()

        logger.log(`Connected to Redis: ${REDIS_URL}`)

        return client
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
