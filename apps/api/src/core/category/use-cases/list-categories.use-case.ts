import { ListCategoriesSchema, ListCategoriesInput, ListCategoriesOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ListCategoriesInput, ListCategoriesOutput> =
  ({ Repositories }) =>
  async (input) => {
    const { values, total } = await Repositories.category.find(input)

    return {
      values: values.map((category) => category.state),
      total
    }
  }

export const listCategories = createUseCase(execute, ListCategoriesSchema)
