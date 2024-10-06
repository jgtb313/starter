import { GetPlanSchema, GetPlanInput, GetPlanOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<GetPlanInput, GetPlanOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const plan = await Repositories.plan.findById(id)

    return plan.state
  }

export const getPlan = createUseCase(execute, GetPlanSchema)
