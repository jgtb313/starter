import { Inject, Injectable } from '@nestjs/common'

import { templates } from './sms.templates'

import type { INotificationStrategy, ISMSAdapter } from '@/ports/notification'

@Injectable()
export class SMSStrategy implements INotificationStrategy<'SMS'> {
  constructor(@Inject('SMS') private readonly sms: ISMSAdapter) {}

  send: INotificationStrategy<'SMS'>['send'] = ({ recipient, template, props }) => {
    const templateValue = templates[template]
    const body = templateValue(props)

    return this.sms.send({
      to: recipient,
      body,
    })
  }
}
