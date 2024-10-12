import { UpdateUserEmailSchema, UpdateUserEmailInput, UpdateUserEmailOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateUserEmailInput, UpdateUserEmailOutput> =
  ({ Repositories }) =>
  async ({ id, email }) => {
    const user = await Repositories.user.findById(id)

    user.state.email = email

    await Repositories.user.updateById(user.state.id, user)
  }

export const updateUserEmail = createUseCase(execute, UpdateUserEmailSchema)
