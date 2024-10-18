import { UpdateUserEmailSchema, UpdateUserEmailInput, UpdateUserEmailOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateUserEmailInput, UpdateUserEmailOutput> =
  ({ Database }) =>
  async ({ id, email }) => {
    const user = await Database.user.findById(id)

    user.state.email = email

    await Database.user.updateById(user.state.id, user)
  }

export const updateUserEmail = createUseCase(execute, UpdateUserEmailSchema)
