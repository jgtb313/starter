import { UpdateUserPasswordSchema, UpdateUserPasswordInput, UpdateUserPasswordOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateUserPasswordInput, UpdateUserPasswordOutput> =
  ({ Repositories, Encrypt }) =>
  async ({ id, password }) => {
    const user = await Repositories.user.findById(id)

    user.state.password = Encrypt.hash(password)

    await Repositories.user.updateById(user.state.id, user)
  }

export const updateUserPassword = createUseCase(execute, UpdateUserPasswordSchema)
