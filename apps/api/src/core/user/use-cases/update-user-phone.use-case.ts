import { UpdateUserPhoneSchema, UpdateUserPhoneInput, UpdateUserPhoneOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<UpdateUserPhoneInput, UpdateUserPhoneOutput> =
  ({ Database }) =>
  async ({ id, phone }) => {
    const user = await Database.user.findById(id)

    user.state.phone = phone

    const { state } = await Database.user.updateById(user.state.id, user)

    return state
  }

export const updateUserPhone = createUseCase(execute, UpdateUserPhoneSchema)
