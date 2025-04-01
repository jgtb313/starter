import { Injectable, Inject } from '@nestjs/common'

import { Subscription, BaseSubscription } from '@/schemas'
import { ISubscriptionRepository } from '@/ports/database/subscription'
import { InvoiceService } from '../invoice'

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY') private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly invoiceService: InvoiceService,
    // private readonly recurrenceService: RecurrenceService
  ) {}

  createSubscription() {}

  changeSubscriptionPaymentMethod() {}

  changeSubscriptionPlan() {}

  cancelSubscription() {}
}
