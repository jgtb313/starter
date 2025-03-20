import { Injectable, Inject } from '@nestjs/common'

import { INotificationStrategy, IWebPushAdapter } from '@/ports/notification'
import { templates } from './web-push.templates'

@Injectable()
export class WebPushStrategy implements INotificationStrategy<'WEB_PUSH'> {
  constructor(@Inject('WebPush') private readonly webPush: IWebPushAdapter) {}

  send: INotificationStrategy<'WEB_PUSH'>['send'] = ({ recipient, template, props }) => {
    const templateValue = templates[template]
    const body = templateValue(props)

    return this.webPush.send({
      to: recipient,
      body,
      props,
    })
  }
}
