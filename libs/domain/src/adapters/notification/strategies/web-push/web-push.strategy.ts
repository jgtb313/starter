import { Inject, Injectable } from '@nestjs/common'

import { templates } from './web-push.templates'

import type {
	INotificationStrategy,
	IWebPushAdapter,
} from '@/ports/notification'

@Injectable()
export class WebPushStrategy implements INotificationStrategy<'WEB_PUSH'> {
	constructor(@Inject('WebPush') private readonly webPush: IWebPushAdapter) {}

	send: INotificationStrategy<'WEB_PUSH'>['send'] = ({
		recipient,
		template,
		props,
	}) => {
		const templateValue = templates[template]
		const body = templateValue(props)

		return this.webPush.send({
			to: recipient,
			body,
			props,
		})
	}
}
