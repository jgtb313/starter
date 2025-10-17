import { BaseDomain } from '@/support/base-domain'
import {
	type Subscription,
	type SubscriptionInput,
	SubscriptionSchema,
} from '@/core/subscription/subscription.schema'

export class SubscriptionDomain extends BaseDomain<
	Subscription,
	SubscriptionInput
> {
	constructor(subscription: SubscriptionInput) {
		super(SubscriptionSchema, subscription)
	}
}
