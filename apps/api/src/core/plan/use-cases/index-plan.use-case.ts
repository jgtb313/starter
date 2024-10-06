import { IndexPlanSchema, IndexPlanInput, IndexPlanOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<IndexPlanInput, IndexPlanOutput> =
  ({ Repositories }) =>
  async ({ filter }) => {
    const plans = await Repositories.plan.index({
      $or: [
        {
          name: filter
        }
      ]
    })

    return plans.map((plan) => plan.state)
  }

export const indexPlan = createUseCase(execute, IndexPlanSchema)
