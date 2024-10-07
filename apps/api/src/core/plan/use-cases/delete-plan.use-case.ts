import { DeletePlanSchema, DeletePlanInput, DeletePlanOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<DeletePlanInput, DeletePlanOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const plan = await Repositories.plan.findById(id)

    plan.markAsDeleted()

    await Repositories.plan.updateById(plan.state.id, plan)
  }

export const deletePlan = createUseCase(execute, DeletePlanSchema)
