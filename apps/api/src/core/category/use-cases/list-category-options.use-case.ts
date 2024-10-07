import { ListCategoryOptionsSchema, ListCategoryOptionsInput, ListCategoryOptionsOutput, PlanStatusEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ListCategoryOptionsInput, ListCategoryOptionsOutput> =
  ({ Repositories }) =>
  async () => {
    const categories = await Repositories.category.index({})

    return categories.map((category) => category.state)
  }

export const listCategoryOptions = createUseCase(execute, ListCategoryOptionsSchema)
