import { Injectable } from '@nestjs/common'
import { uuid } from '@starter/common'

import { IRecurrence } from '@/ports/recurrence'

@Injectable()
export class RecurrenceService implements IRecurrence {
  constructor() {}

  create: IRecurrence['create'] = async () => {
    const recurrenceId = uuid()

    return {
      recurrenceId,
    }
  }

  changePaymentMethod: IRecurrence['changePaymentMethod'] = async () => {
    const recurrenceId = uuid()

    return {
      recurrenceId,
    }
  }

  changePlan: IRecurrence['changePlan'] = async () => {
    const recurrenceId = uuid()

    return {
      recurrenceId,
    }
  }

  cancel: IRecurrence['cancel'] = async () => {
    const recurrenceId = uuid()

    return {
      recurrenceId,
    }
  }
}
