import { Injectable } from '@nestjs/common'
import { uuid } from '@starter/common'

import { Invoice } from '@/schemas'
import { IRecurrence } from '@/ports/recurrence'

@Injectable()
export class RecurrenceService implements IRecurrence {
  constructor() {}

  createPlan: IRecurrence['createPlan'] = async () => {
    const planId = uuid()

    return {
      planId,
    }
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
    const subscriptionId = uuid()

    return {
      subscriptionId,
    }
  }
}
