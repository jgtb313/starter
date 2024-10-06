import { ActivePlanSchema, ActivePlanInput, ActivePlanOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ActivePlanInput, ActivePlanOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const plan = await Repositories.plan.findById(id)

    plan.markDeleted()

    const updatedPlan = await Repositories.plan.updateById(plan.state.id, plan)

    return updatedPlan.state
  }

export const deletePlan = createUseCase(execute, ActivePlanSchema)
