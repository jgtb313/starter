import { BaseDomain } from '@/support/base-domain'
import {
	type Subscription,
	SubscriptionSchema,
} from '@/core/subscription/subscription.schema'

export class SubscriptionDomain extends BaseDomain<Subscription> {
	constructor(subscription: Subscription) {
		super(SubscriptionSchema, subscription)
	}
}
