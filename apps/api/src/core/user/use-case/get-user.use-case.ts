import { GetUserSchema, GetUserInput, GetUserOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<GetUserInput, GetUserOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const user = await Repositories.user.findById(id)

    return user.state
  }

export const getUser = createUseCase(execute, GetUserSchema)
