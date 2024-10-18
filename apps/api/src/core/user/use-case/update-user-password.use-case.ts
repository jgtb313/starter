import { UpdateUserPasswordSchema, UpdateUserPasswordInput, UpdateUserPasswordOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateUserPasswordInput, UpdateUserPasswordOutput> =
  ({ Database, Encrypt }) =>
  async ({ id, password }) => {
    const user = await Database.user.findById(id)

    user.state.password = Encrypt.hash(password)

    await Database.user.updateById(user.state.id, user)
  }

export const updateUserPassword = createUseCase(execute, UpdateUserPasswordSchema)
