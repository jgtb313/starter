import { SignInSchema, SignInInput, SignInOutput } from '@starter/schema'

import { AuthError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { getTokenPayload } from '@/support/auth'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<SignInInput, SignInOutput> =
  ({ Database, Encrypt, JWT, Logger }) =>
  async ({ email, password }) => {
    Logger.info(`Attempting to sign in user with email: ${email}`)

    const user = await Database.user.findOne({ email })

    if (!user) {
      Logger.warn(`Failed login attempt - user not found for email: ${email}`)
      throw new AuthError('Invalid access data')
    }

    const isValidPassword = Encrypt.compare(password, user.state.password)

    if (!isValidPassword) {
      Logger.warn(`Failed login attempt - invalid password for user with email: ${email}`)
      throw new AuthError('Invalid access data')
    }

    const token = JWT.generate(getTokenPayload(user.state))
    Logger.info(`Token generated successfully for user with email: ${email}`)

    return {
      token,
    }
  }

export const signIn = createUseCase(execute, SignInSchema)
