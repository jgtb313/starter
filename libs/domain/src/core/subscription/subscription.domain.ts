import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import {
	type Subscription,
	type SubscriptionInput,
	SubscriptionSchema,
} from '@/core/subscription/subscription.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class SubscriptionDomain extends BaseDomain<Subscription> {
	constructor(
		subscription: SubscriptionInput,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(SubscriptionSchema.parse(subscription))
	}
}
