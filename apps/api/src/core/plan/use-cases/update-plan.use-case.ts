import { UpdatePlanSchema, UpdatePlanInput, UpdatePlanOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdatePlanInput, UpdatePlanOutput> =
  ({ Repositories }) =>
  async ({ id, ...props }) => {
    const plan = await Repositories.plan.findById(id)

    plan.state = {
      ...plan.state,
      ...props
    }

    const updatedPlan = await Repositories.plan.updateById(plan.state.id, plan)

    return updatedPlan.state
  }

export const updatePlan = createUseCase(execute, UpdatePlanSchema)
