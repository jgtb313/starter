import { GetStoreSchema, GetStoreInput, GetStoreOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<GetStoreInput, GetStoreOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    return Repositories.store.findById(id).then((store) => store.state)
  }

export const getStore = createUseCase(execute, GetStoreSchema)
