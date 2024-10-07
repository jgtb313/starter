import { CreateCategorySchema, CreateCategoryInput, CreateCategoryOutput, CategoryStatusEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'
import { Category } from '@/core/category/domain'

const execute: IUseCaseExecute<CreateCategoryInput, CreateCategoryOutput> =
  ({ Repositories }) =>
  async (input) => {
    const category = await Repositories.category.create(
      new Category(input)
    )

    return category.state
  }

export const createCategory = createUseCase(execute, CreateCategorySchema)
