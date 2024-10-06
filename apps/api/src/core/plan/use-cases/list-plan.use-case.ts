import { ListPlanSchema, ListPlanInput, ListPlanOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ListPlanInput, ListPlanOutput> =
  ({ Repositories }) =>
  async (input) => {
    const { values, total } = await Repositories.plan.find(input)

    return {
      values: values.map((plan) => plan.state),
      total
    }
  }

export const listPlan = createUseCase(execute, ListPlanSchema)
