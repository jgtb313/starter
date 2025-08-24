import { Inject, Injectable } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import type { Transporter } from 'nodemailer'

import type { IEmailAdapter } from '@/ports/notification'

@Injectable()
export class GoogleEmailAdapter implements IEmailAdapter {
  constructor(
    @Inject('GOOGLE_EMAIL_CLIENT') private readonly client: Transporter,
    private readonly configService: ConfigService,
  ) {}

  send: IEmailAdapter['send'] = async ({ to, subject, body }) => {
    const GOOGLE_MAIL_USER = this.configService.get<string>('GOOGLE_MAIL_USER')!

    await this.client.sendMail({
      from: GOOGLE_MAIL_USER,
      to: to === 'SELF' ? GOOGLE_MAIL_USER : to,
      subject,
      html: body,
    })
  }
}
