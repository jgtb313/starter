import { UpdateUserPhoneSchema, UpdateUserPhoneInput, UpdateUserPhoneOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UpdateUserPhoneInput, UpdateUserPhoneOutput> =
  ({ Repositories }) =>
  async ({ id, phone }) => {
    const user = await Repositories.user.findById(id)

    user.state.phone = phone

    await Repositories.user.updateById(user.state.id, user)
  }

export const updateUserPhone = createUseCase(execute, UpdateUserPhoneSchema)
