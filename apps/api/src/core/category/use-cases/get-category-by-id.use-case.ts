import { GetCategorySchema, GetCategoryInput, GetCategoryOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<GetCategoryInput, GetCategoryOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const category = await Repositories.category.findById(id)

    return category.state
  }

export const getCategory = createUseCase(execute, GetCategorySchema)
