import { ActiveCategorySchema, ActiveCategoryInput, ActiveCategoryOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ActiveCategoryInput, ActiveCategoryOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const category = await Repositories.category.findById(id)

    category.markAsInactive()

    const updatedCategory = await Repositories.category.updateById(category.state.id, category)

    return updatedCategory.state
  }

export const inactiveCategory = createUseCase(execute, ActiveCategorySchema)
