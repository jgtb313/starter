import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import twilio from 'twilio'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'TWILIO_WHATSAPP_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const TWILIO_WHATSAPP_ACCOUNT_SID = configService.get<string>('TWILIO_WHATSAPP_ACCOUNT_SID')!
        const TWILIO_WHATSAPP_AUTH_TOKEN = configService.get<string>('TWILIO_WHATSAPP_AUTH_TOKEN')!

        return twilio(TWILIO_WHATSAPP_ACCOUNT_SID, TWILIO_WHATSAPP_AUTH_TOKEN)
      },
      inject: [ConfigService],
    },
  ],
  exports: ['TWILIO_WHATSAPP_CLIENT'],
})
export class TwilioWhatsappModule {}
