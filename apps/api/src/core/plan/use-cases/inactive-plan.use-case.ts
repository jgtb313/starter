import { InactivePlanSchema, InactivePlanInput, InactivePlanOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<InactivePlanInput, InactivePlanOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const plan = await Repositories.plan.findById(id)

    plan.markAsInactive()

    const updatedPlan = await Repositories.plan.updateById(plan.state.id, plan)

    return updatedPlan.state
  }

export const inactivePlan = createUseCase(execute, InactivePlanSchema)
