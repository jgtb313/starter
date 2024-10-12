import { UpdateUserSchema, UpdateUserInput, UpdateUserOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateUserInput, UpdateUserOutput> =
  ({ Repositories }) =>
  async ({ id, ...props }) => {
    const user = await Repositories.user.findById(id)

    user.state = {
      ...user.state,
      ...props,
    }

    const { state } = await Repositories.user.updateById(user.state.id, user)

    return state
  }

export const updateUser = createUseCase(execute, UpdateUserSchema)
