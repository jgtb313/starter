import { Injectable, Inject } from '@nestjs/common'

import { IRecurrence, IRecurrenceAdapter } from '@/ports/recurrence'

@Injectable()
export class RecurrenceService implements IRecurrence {
  constructor(@Inject('Adapter') private readonly adapter: IRecurrenceAdapter) {}

  createPlan: IRecurrence['createPlan'] = async (input) => {
    return this.adapter.createPlan(input)
  }

  updatePlan: IRecurrence['updatePlan'] = async (input) => {
    return this.adapter.updatePlan(input)
  }

  cancelPlan: IRecurrence['cancelPlan'] = async (input) => {
    return this.adapter.cancelPlan(input)
  }

  createCustmer: IRecurrence['createCustmer'] = async (input) => {
    return this.adapter.createCustmer(input)
  }

  createSubscription: IRecurrence['createSubscription'] = async (input) => {
    return this.adapter.createSubscription(input)
  }

  changeSubscriptionPaymentMethod: IRecurrence['changeSubscriptionPaymentMethod'] = async (input) => {
    return this.adapter.changeSubscriptionPaymentMethod(input)
  }

  changeSubscriptionPlan: IRecurrence['changeSubscriptionPlan'] = async (input) => {
    return this.adapter.changeSubscriptionPlan(input)
  }

  cancelSubscription: IRecurrence['cancelSubscription'] = async (input) => {
    return this.adapter.cancelSubscription(input)
  }
}
