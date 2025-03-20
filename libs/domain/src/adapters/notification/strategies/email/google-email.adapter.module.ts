import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { createTransport } from 'nodemailer'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'GOOGLE_EMAIL_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const GOOGLE_MAIL_USER = configService.get<string>('GOOGLE_MAIL_USER')!
        const GOOGLE_MAIL_PASSWORD = configService.get<string>('GOOGLE_MAIL_PASSWORD')!

        const transporter = createTransport({
          service: 'gmail',
          secure: true,
          port: 465,
          auth: {
            user: GOOGLE_MAIL_USER,
            pass: GOOGLE_MAIL_PASSWORD,
          },
        })

        return transporter
      },
      inject: [ConfigService],
    },
  ],
  exports: ['GOOGLE_EMAIL_CLIENT'],
})
export class GoogleEmailModule {}
