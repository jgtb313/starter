import { Inject, Injectable } from '@nestjs/common'

import type {
	IMobilePushAdapter,
	INotificationStrategy,
} from '@/ports/notification'

import { templates } from './mobile-push.templates'

@Injectable()
export class MobilePushStrategy
	implements INotificationStrategy<'MOBILE_PUSH'>
{
	constructor(
		@Inject('MobilePush') private readonly mobilePush: IMobilePushAdapter,
	) {}

	send: INotificationStrategy<'MOBILE_PUSH'>['send'] = ({
		recipient,
		template,
		props,
	}) => {
		const templateValue = templates[template]
		const body = templateValue(props)

		return this.mobilePush.send({
			to: recipient,
			body,
			props,
		})
	}
}
