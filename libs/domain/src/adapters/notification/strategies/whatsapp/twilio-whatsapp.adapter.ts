import { Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Twilio } from 'twilio'

import { IWhatsappAdapter } from '@/ports/notification'

export class TwillioWhatsappAdapter implements IWhatsappAdapter {
  private readonly TWILIO_WHATSAPP_FROM: string

  constructor(
    @Inject('TWILIO_WHATSAPP_CLIENT') private readonly client: Twilio,
    private readonly configService: ConfigService,
  ) {
    this.TWILIO_WHATSAPP_FROM = this.configService.get<string>('TWILIO_WHATSAPP_FROM')!
  }

  send: IWhatsappAdapter['send'] = async ({ to, contentSid, contentVariables }) => {
    console.log({
      from: `whatsapp:+${this.TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${to}`,
      contentSid,
      contentVariables,
    })

    // await this.client.messages.create({
    //   from: `whatsapp:+${this.TWILIO_WHATSAPP_FROM}`,
    //   to: `whatsapp:${to}`,
    //   contentSid,
    //   contentVariables,
    // })
  }
}
