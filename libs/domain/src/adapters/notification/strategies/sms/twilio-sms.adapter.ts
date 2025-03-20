import { Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Twilio } from 'twilio'

import { ISMSAdapter } from '@/ports/notification'

export class TwilioSMSAdapter implements ISMSAdapter {
  private readonly TWILIO_SMS_FROM: string

  constructor(
    @Inject('TWILIO_SMS_CLIENT') private readonly client: Twilio,
    private readonly configService: ConfigService,
  ) {
    this.TWILIO_SMS_FROM = this.configService.get<string>('TWILIO_SMS_FROM')!
  }

  send: ISMSAdapter['send'] = async ({ to, body }) => {
    console.log({ from: this.TWILIO_SMS_FROM, to, body })
    // await this.client.messages.create({
    //   from: this.TWILIO_SMS_FROM,
    //   to,
    //   body,
    // })
  }
}
