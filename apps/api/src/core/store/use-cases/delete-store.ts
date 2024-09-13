import { DeleteStoreSchema, DeleteStoreInput, DeleteStoreOutput, StoreStatusEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<DeleteStoreInput, DeleteStoreOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const store = await Repositories.store.findById(id)

    store.state.status === StoreStatusEnum.DELETED

    await Repositories.store.updateById(id, store)
  }

export const deleteStore = createUseCase(execute, DeleteStoreSchema)
