import { Module, Logger } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import pino from 'pino'
import pinoES from 'pino-elasticsearch'
import { ecsFormat } from '@elastic/ecs-pino-format'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PINO_ES_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('Logger')

        const disabled = configService.get<string>('LOGGER_DISABLED') === 'true'

        if (disabled) {
          return
        }

        const LOGGER_NODE = configService.get<string>('LOGGER_NODE')!
        const LOGGER_USER = configService.get<string>('LOGGER_USER')!
        const LOGGER_PASSWORD = configService.get<string>('LOGGER_PASSWORD')!

        const esTransport = pinoES({
          index: 'logs',
          node: LOGGER_NODE,
          auth: {
            username: LOGGER_USER,
            password: LOGGER_PASSWORD,
          },
          esVersion: 7,
          flushBytes: 1000,
        })

        const client = pino(
          {
            ...ecsFormat({}),
          },
          pino.multistream([{ stream: esTransport }]),
        )

        logger.log(`Connected on Pino ES: ${LOGGER_NODE}`)

        return client
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PINO_ES_CLIENT'],
})
export class PinoESModule {}
