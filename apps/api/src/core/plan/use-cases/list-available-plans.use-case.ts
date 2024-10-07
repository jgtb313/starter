import { ListAvailablePlansSchema, ListAvailablePlansInput, ListAvailablePlansOutput, PlanStatusEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ListAvailablePlansInput, ListAvailablePlansOutput> =
  ({ Repositories }) =>
  async () => {
    const plans = await Repositories.plan.index({ status: PlanStatusEnum.ACTIVE })

    return plans.map((plan) => plan.state)
  }

export const listAvailablePlans = createUseCase(execute, ListAvailablePlansSchema)
