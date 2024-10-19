import { GetUserSchema, GetUserInput, GetUserOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<GetUserInput, GetUserOutput> =
  ({ Database }) =>
  async ({ id }) => {
    const user = await Database.user.findById(id)

    return user.state
  }

export const getUser = createUseCase(execute, GetUserSchema)
