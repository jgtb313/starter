import { ListPlansSchema, ListPlansInput, ListPlansOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ListPlansInput, ListPlansOutput> =
  ({ Repositories }) =>
  async (input) => {
    const { values, total } = await Repositories.plan.find(input)

    return {
      values: values.map((plan) => plan.state),
      total
    }
  }

export const listPlans = createUseCase(execute, ListPlansSchema)
