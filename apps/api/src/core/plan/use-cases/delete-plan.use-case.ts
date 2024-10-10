import { DeletePlanSchema, DeletePlanInput, DeletePlanOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<DeletePlanInput, DeletePlanOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const plan = await Repositories.plan.findById(id)

    await Repositories.plan.deleteById(plan.state.id)
  }

export const deletePlan = createUseCase(execute, DeletePlanSchema)
