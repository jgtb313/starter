import { Injectable, Inject } from '@nestjs/common'
import { uuid } from '@starter/common'

import { IRecurrence } from '@/ports/recurrence'
import { StripeRecurrenceAdapter } from '@/adapters/recurrence/stripe.recurrence.adapter'
import { Invoice } from '@/core/invoice/invoice.schema'

@Injectable()
export class RecurrenceService implements IRecurrence {
  constructor(@Inject('Stripe') private readonly stripe: StripeRecurrenceAdapter) {}

  createPlan: IRecurrence['createPlan'] = async (input) => {
    return this.stripe.createPlan(input)
  }

  updatePlan: IRecurrence['updatePlan'] = async () => {
    return
  }

  cancelPlan: IRecurrence['cancelPlan'] = async () => {
    return
  }

  createSubscription: IRecurrence['createSubscription'] = async () => {
    const subscriptionId = uuid()

    return {
      subscriptionId,
      invoice: {} as Invoice,
    }
  }

  changeSubscriptionPaymentMethod: IRecurrence['changeSubscriptionPaymentMethod'] = async () => {
    const subscriptionId = uuid()

    return {
      subscriptionId,
    }
  }

  changeSubscriptionPlan: IRecurrence['changeSubscriptionPlan'] = async () => {
    const subscriptionId = uuid()

    return {
      subscriptionId,
    }
  }

  cancelSubscription: IRecurrence['cancelSubscription'] = async () => {
    return
  }
}
