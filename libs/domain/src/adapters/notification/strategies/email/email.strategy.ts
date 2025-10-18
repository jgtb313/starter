import { renderEmail } from '@starter/emails'

import { Inject, Injectable } from '@nestjs/common'

import type { IEmailAdapter, INotificationStrategy } from '@/ports/notification'

@Injectable()
export class EmailStrategy implements INotificationStrategy<'EMAIL'> {
	constructor(@Inject('Email') private readonly email: IEmailAdapter) {}

	send: INotificationStrategy<'EMAIL'>['send'] = async ({
		recipient,
		template,
		props,
	}) => {
		const { subject, html } = await renderEmail({
			template,
			props,
		})

		return this.email.send({
			to: recipient,
			subject,
			body: html,
		})
	}
}
