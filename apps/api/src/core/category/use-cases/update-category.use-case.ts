import { UpdateCategorySchema, UpdateCategoryInput, UpdateCategoryOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateCategoryInput, UpdateCategoryOutput> =
  ({ Repositories }) =>
  async ({ id, ...props }) => {
    const category = await Repositories.category.findById(id)

    category.state = {
      ...category.state,
      ...props
    }

    const updatedCategory = await Repositories.category.updateById(category.state.id, category)

    return updatedCategory.state
  }

export const updateCategory = createUseCase(execute, UpdateCategorySchema)
