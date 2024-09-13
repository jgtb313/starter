import { ListStoreSchema, ListStoreInput, ListStoreOutput, StoreStatusEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ListStoreInput, ListStoreOutput> =
  ({ Repositories }) =>
  async (input) => {
    return Repositories.store
      .find({
        ...input,
        status: {
          $nin: [StoreStatusEnum.DELETED]
        }
      })
      .then((response) => ({
        ...response,
        values: response.values.map((resource) => resource.state)
      }))
  }

export const listStore = createUseCase(execute, ListStoreSchema)
