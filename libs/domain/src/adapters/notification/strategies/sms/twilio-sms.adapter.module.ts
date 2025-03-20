import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import twilio from 'twilio'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'TWILIO_SMS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const TWILIO_SMS_ACCOUNT_SID = configService.get<string>('TWILIO_SMS_ACCOUNT_SID')!
        const TWILIO_SMS_AUTH_TOKEN = configService.get<string>('TWILIO_SMS_AUTH_TOKEN')!

        return twilio(TWILIO_SMS_ACCOUNT_SID, TWILIO_SMS_AUTH_TOKEN)
      },
      inject: [ConfigService],
    },
  ],
  exports: ['TWILIO_SMS_CLIENT'],
})
export class TwilioSMSModule {}
