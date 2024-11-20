import { SignInSchema, SignInInput, SignInOutput } from '@starter/schema'

import { env } from '@/config'
import { AuthError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { getTokenPayload } from '@/support/auth'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<SignInInput, SignInOutput> =
  ({ Database, Encrypt, JWT, Logger }) =>
  async ({ email, password }) => {
    const SERVER_AUTHENTICATE_SECRET = env('SERVER_AUTHENTICATE_SECRET')

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

    const tokenPayload = getTokenPayload(user.state)

    const accessToken = JWT.generate(tokenPayload, SERVER_AUTHENTICATE_SECRET, { expiresIn: '7d' })

    Logger.info(`Token generated successfully for user with email: ${email}`)

    return {
      accessToken,
    }
  }

export const signIn = createUseCase(execute, SignInSchema)
