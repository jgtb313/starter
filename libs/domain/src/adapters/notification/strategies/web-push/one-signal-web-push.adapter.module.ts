import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import OneSignal from 'onesignal-node'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ONE_SIGNAL_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const ONE_SIGNAL_APP_ID = configService.get<string>('ONE_SIGNAL_APP_ID')!
        const ONE_SIGNAL_API_KEY = configService.get<string>('ONE_SIGNAL_API_KEY')!

        return new OneSignal.Client(ONE_SIGNAL_APP_ID, ONE_SIGNAL_API_KEY)
      },
      inject: [ConfigService],
    },
  ],
  exports: ['ONE_SIGNAL_CLIENT'],
})
export class OneSignalWebPushModule {}
