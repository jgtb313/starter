import { Injectable } from '@nestjs/common'

import { INotification, NotificationInput, NotificationTemplateProps } from '@/ports/notification'
import { EmailStrategy, SMSStrategy, WhatsappStrategy, WebPushStrategy, MobilePushStrategy } from '@/adapters/notification/strategies'

@Injectable()
export class NotificationService implements INotification {
  constructor(
    private readonly email: EmailStrategy,
    private readonly sms: SMSStrategy,
    private readonly whatsapp: WhatsappStrategy,
    private readonly webPush: WebPushStrategy,
    private readonly mobilePush: MobilePushStrategy,
  ) {}

  send: INotification['send'] = (channel, notification) => {
    if (channel === 'EMAIL') {
      this.email.send(notification as NotificationInput<'EMAIL', keyof NotificationTemplateProps['EMAIL']>)
    } else if (channel === 'SMS') {
      this.sms.send(notification as NotificationInput<'SMS', keyof NotificationTemplateProps['SMS']>)
    } else if (channel === 'WHATSAPP') {
      this.whatsapp.send(notification as NotificationInput<'WHATSAPP', keyof NotificationTemplateProps['WHATSAPP']>)
    } else if (channel === 'WEB_PUSH') {
      this.webPush.send(notification as NotificationInput<'WEB_PUSH', keyof NotificationTemplateProps['WEB_PUSH']>)
    } else if (channel === 'MOBILE_PUSH') {
      this.mobilePush.send(notification as NotificationInput<'MOBILE_PUSH', keyof NotificationTemplateProps['MOBILE_PUSH']>)
    }
  }
}
