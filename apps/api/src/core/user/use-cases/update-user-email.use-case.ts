import { UpdateUserEmailSchema, UpdateUserEmailInput, UpdateUserEmailOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<UpdateUserEmailInput, UpdateUserEmailOutput> =
  ({ Database }) =>
  async ({ id, email }) => {
    const user = await Database.user.findById(id)

    user.state.email = email

    const { state } = await Database.user.updateById(user.state.id, user)

    return state
  }

export const updateUserEmail = createUseCase(execute, UpdateUserEmailSchema)
