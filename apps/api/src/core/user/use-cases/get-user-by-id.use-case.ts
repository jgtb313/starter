import { GetUserByIdSchema, GetUserByIdInput, GetUserByIdOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<GetUserByIdInput, GetUserByIdOutput> =
  ({ Database }) =>
  async ({ id }) => {
    const user = await Database.user.findById(id)

    return user.state
  }

export const getUserById = createUseCase(execute, GetUserByIdSchema)
