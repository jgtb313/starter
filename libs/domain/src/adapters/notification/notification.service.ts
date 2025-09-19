import { Inject, Injectable } from '@nestjs/common'

import {
	EmailStrategy,
	MobilePushStrategy,
	SMSStrategy,
	WebPushStrategy,
	WhatsappStrategy,
} from '@/adapters/notification/strategies'
import type {
	INotification,
	NotificationInput,
	NotificationTemplateProps,
} from '@/ports/notification'

@Injectable()
export class NotificationService implements INotification {
	constructor(
		@Inject(EmailStrategy)
		private readonly email: EmailStrategy,
		@Inject(SMSStrategy)
		private readonly sms: SMSStrategy,
		@Inject(WhatsappStrategy)
		private readonly whatsapp: WhatsappStrategy,
		@Inject(WebPushStrategy)
		private readonly webPush: WebPushStrategy,
		@Inject(MobilePushStrategy)
		private readonly mobilePush: MobilePushStrategy,
	) {}

	send: INotification['send'] = (channel, notification) => {
		if (channel === 'EMAIL') {
			this.email.send(
				notification as NotificationInput<
					'EMAIL',
					keyof NotificationTemplateProps['EMAIL']
				>,
			)
		} else if (channel === 'SMS') {
			this.sms.send(
				notification as NotificationInput<
					'SMS',
					keyof NotificationTemplateProps['SMS']
				>,
			)
		} else if (channel === 'WHATSAPP') {
			this.whatsapp.send(
				notification as NotificationInput<
					'WHATSAPP',
					keyof NotificationTemplateProps['WHATSAPP']
				>,
			)
		} else if (channel === 'WEB_PUSH') {
			this.webPush.send(
				notification as NotificationInput<
					'WEB_PUSH',
					keyof NotificationTemplateProps['WEB_PUSH']
				>,
			)
		} else if (channel === 'MOBILE_PUSH') {
			this.mobilePush.send(
				notification as NotificationInput<
					'MOBILE_PUSH',
					keyof NotificationTemplateProps['MOBILE_PUSH']
				>,
			)
		}
	}
}
