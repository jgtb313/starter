import { Injectable, Inject } from '@nestjs/common'

import { IRecurrence, IRecurrenceAdapter } from '@/ports/recurrence'

@Injectable()
export class RecurrenceService implements IRecurrence {
  constructor(@Inject('Recurrence') private readonly recurrence: IRecurrenceAdapter) {}

  createPlan: IRecurrence['createPlan'] = async (input) => {
    return this.recurrence.createPlan(input)
  }

  updatePlan: IRecurrence['updatePlan'] = async (input) => {
    return this.recurrence.updatePlan(input)
  }

  cancelPlan: IRecurrence['cancelPlan'] = async (input) => {
    return this.recurrence.cancelPlan(input)
  }

  createCustmer: IRecurrence['createCustmer'] = async (input) => {
    return this.recurrence.createCustmer(input)
  }

  createSubscription: IRecurrence['createSubscription'] = async (input) => {
    return this.recurrence.createSubscription(input)
  }

  changeSubscriptionPaymentMethod: IRecurrence['changeSubscriptionPaymentMethod'] = async (input) => {
    return this.recurrence.changeSubscriptionPaymentMethod(input)
  }

  changeSubscriptionPlan: IRecurrence['changeSubscriptionPlan'] = async (input) => {
    return this.recurrence.changeSubscriptionPlan(input)
  }

  cancelSubscription: IRecurrence['cancelSubscription'] = async (input) => {
    return this.recurrence.cancelSubscription(input)
  }
}
