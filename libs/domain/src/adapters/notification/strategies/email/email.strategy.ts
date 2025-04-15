import { Injectable, Inject } from '@nestjs/common'
import { renderEmail } from '@starter/emails'

import { INotificationStrategy, IEmailAdapter } from '@/ports/notification'

@Injectable()
export class EmailStrategy implements INotificationStrategy<'EMAIL'> {
  constructor(@Inject('Email') private readonly email: IEmailAdapter) {}

  send: INotificationStrategy<'EMAIL'>['send'] = async ({ recipient, template, props }) => {
    const { subject, html } = await renderEmail({ template, props })

    return this.email.send({
      to: recipient,
      subject,
      body: html,
    })
  }
}
