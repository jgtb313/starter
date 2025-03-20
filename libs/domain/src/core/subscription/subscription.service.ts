import { Injectable, Inject } from '@nestjs/common'

import { Subscription, BaseSubscription } from '@/schemas'
import { ISubscriptionRepository } from '@/ports/database/subscription'

@Injectable()
export class SubscriptionService {
  constructor(@Inject('SUBSCRIPTION_REPOSITORY') private readonly subscriptionRepository: ISubscriptionRepository) {}

  create() {}

  changePaymentMethod() {}

  changePlan() {}

  cancel() {}
}
