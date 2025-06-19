import { BaseDomain } from '@/support/base-domain'
import { SubscriptionSchema, Subscription, SubscriptionInput } from '@/core/subscription/subscription.schema'

export class SubscriptionDomain extends BaseDomain<Subscription, SubscriptionInput> {
  constructor(organization: SubscriptionInput) {
    super(SubscriptionSchema, organization)
  }
}
