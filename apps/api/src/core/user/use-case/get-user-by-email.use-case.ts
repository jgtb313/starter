import { GetUserByEmailSchema, GetUserByEmailInput, GetUserByEmailOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<GetUserByEmailInput, GetUserByEmailOutput> =
  ({ Database }) =>
  async ({ email }) => {
    const user = await Database.user.findOne({ email })

    if (!user) {
      return {
        user: null,
      }
    }

    return {
      user: {
        id: user.state.id,
        email: user.state.email,
      },
    }
  }

export const getUserByEmail = createUseCase(execute, GetUserByEmailSchema)
