import { ActiveCategorySchema, ActiveCategoryInput, ActiveCategoryOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ActiveCategoryInput, ActiveCategoryOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const category = await Repositories.category.findById(id)

    category.markAsActive()

    const updatedCategory = await Repositories.category.updateById(category.state.id, category)

    return updatedCategory.state
  }

export const activeCategory = createUseCase(execute, ActiveCategorySchema)
