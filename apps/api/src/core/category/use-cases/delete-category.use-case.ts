import { DeleteCategorySchema, DeleteCategoryInput, DeleteCategoryOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<DeleteCategoryInput, DeleteCategoryOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const category = await Repositories.category.findById(id)

    category.markAsDeleted()

    await Repositories.category.updateById(category.state.id, category)
  }

export const deleteCategory = createUseCase(execute, DeleteCategorySchema)
