import { SignInSchema, SignInInput, SignInOutput } from '@starter/schema'

import { AuthError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { getTokenPayload } from '@/support/auth'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<SignInInput, SignInOutput> =
  ({ Database, Encrypt, JWT }) =>
  async ({ email, password }) => {
    const user = await Database.user.findOne({ email })

    if (!user) {
      throw new AuthError('Invalid access data')
    }

    const isValidPassword = Encrypt.compare(password, user.state.password)

    if (!isValidPassword) {
      throw new AuthError('Invalid access data')
    }

    const token = JWT.generate(getTokenPayload(user.state))

    return {
      token,
    }
  }

export const signIn = createUseCase(execute, SignInSchema)
