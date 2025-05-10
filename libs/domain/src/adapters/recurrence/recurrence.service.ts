import { Injectable, Inject } from '@nestjs/common'

import { IRecurrence } from '@/ports/recurrence'
import { StripeRecurrenceAdapter } from '@/adapters/recurrence/stripe.recurrence.adapter'

@Injectable()
export class RecurrenceService implements IRecurrence {
  constructor(@Inject('Stripe') private readonly stripe: StripeRecurrenceAdapter) {}

  createPlan: IRecurrence['createPlan'] = async (input) => {
    return this.stripe.createPlan(input)
  }

  updatePlan: IRecurrence['updatePlan'] = async (input) => {
    return this.stripe.updatePlan(input)
  }

  cancelPlan: IRecurrence['cancelPlan'] = async (input) => {
    return this.stripe.cancelPlan(input)
  }

  createCustmer: IRecurrence['createCustmer'] = async (input) => {
    return this.stripe.createCustmer(input)
  }

  createSubscription: IRecurrence['createSubscription'] = async (input) => {
    return this.stripe.createSubscription(input)
  }

  changeSubscriptionPaymentMethod: IRecurrence['changeSubscriptionPaymentMethod'] = async (input) => {
    return this.stripe.changeSubscriptionPaymentMethod(input)
  }

  changeSubscriptionPlan: IRecurrence['changeSubscriptionPlan'] = async (input) => {
    return this.stripe.changeSubscriptionPlan(input)
  }

  cancelSubscription: IRecurrence['cancelSubscription'] = async (input) => {
    return this.stripe.cancelSubscription(input)
  }
}
