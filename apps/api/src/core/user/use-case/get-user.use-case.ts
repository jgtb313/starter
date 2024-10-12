import { GetUserMeSchema, GetUserMeInput, GetUserMeOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<GetUserMeInput, GetUserMeOutput> =
  ({ Repositories }) =>
  async ({ id }) => {
    const user = await Repositories.user.findById(id)

    return user.state
  }

export const getUser = createUseCase(execute, GetUserMeSchema)
