import { CreateStoreSchema, CreateStoreInput, CreateStoreOutput, StoreStatusEnum } from '@starter/schema'

import { ConflictError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'
import { Store } from '@/core/store/domain'

const execute: IUseCaseExecute<CreateStoreInput, CreateStoreOutput> =
  ({ Repositories }) =>
  async ({ name, rcky, document }) => {
    const rckyExists = await Repositories.store.rckyExists(rcky)

    if (rckyExists) {
      throw new ConflictError('Rcky já existe')
    }

    const documentExists = await Repositories.store.documentExists(document)

    if (documentExists) {
      throw new ConflictError('Document já existe')
    }

    const store = new Store({
      name,
      rcky,
      document,
      status: StoreStatusEnum.ACTIVE
    })

    const { state } = await Repositories.store.create(store)

    return state
  }

export const createStore = createUseCase(execute, CreateStoreSchema)
