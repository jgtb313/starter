import { Injectable, Inject } from '@nestjs/common'

import { INotificationStrategy, IWhatsappAdapter } from '@/ports/notification'
import { templates } from './whatsapp.templates'

@Injectable()
export class WhatsappStrategy implements INotificationStrategy<'WHATSAPP'> {
  constructor(@Inject('WHATSAPP') private readonly whatsapp: IWhatsappAdapter) {}

  send: INotificationStrategy<'WHATSAPP'>['send'] = ({ recipient, template, props }) => {
    const templateValue = templates[template as keyof typeof templates]
    const { contentSid, contentVariables } = templateValue(props)

    return this.whatsapp.send({
      to: recipient,
      contentSid,
      contentVariables,
    })
  }
}
