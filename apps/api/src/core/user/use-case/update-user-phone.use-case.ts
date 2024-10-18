import { UpdateUserPhoneSchema, UpdateUserPhoneInput, UpdateUserPhoneOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateUserPhoneInput, UpdateUserPhoneOutput> =
  ({ Database }) =>
  async ({ id, phone }) => {
    const user = await Database.user.findById(id)

    user.state.phone = phone

    await Database.user.updateById(user.state.id, user)
  }

export const updateUserPhone = createUseCase(execute, UpdateUserPhoneSchema)
