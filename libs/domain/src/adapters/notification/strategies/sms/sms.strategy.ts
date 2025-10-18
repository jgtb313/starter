import { Inject, Injectable } from '@nestjs/common'

import type { INotificationStrategy, ISMSAdapter } from '@/ports/notification'

import { templates } from './sms.templates'

@Injectable()
export class SMSStrategy implements INotificationStrategy<'SMS'> {
	constructor(@Inject('SMS') private readonly sms: ISMSAdapter) {}

	send: INotificationStrategy<'SMS'>['send'] = ({
		recipient,
		template,
		props,
	}) => {
		const templateValue = templates[template]
		const body = templateValue(props)

		return this.sms.send({
			to: recipient,
			body,
		})
	}
}
