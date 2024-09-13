import { UpdateStoreSchema, UpdateStoreInput, UpdateStoreOutput } from '@starter/schema'

import { ConflictError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateStoreInput, UpdateStoreOutput> =
  ({ Repositories }) =>
  async ({ id, ...props }) => {
    const store = await Repositories.store.findById(id)

    if (props.rcky) {
      const rckyExists = await Repositories.store.rckyExists(props.rcky, { exclude: store.state.id })

      if (rckyExists) {
        throw new ConflictError('Rcky já existe')
      }
    }

    if (props.document) {
      const documentExists = await Repositories.store.documentExists(props.document, { exclude: store.state.id })

      if (documentExists) {
        throw new ConflictError('Document já existe')
      }
    }

    store.state = {
      ...store.state,
      ...props
    }

    const { state } = await Repositories.store.updateById(id, store)

    return state
  }

export const updateStore = createUseCase(execute, UpdateStoreSchema)
