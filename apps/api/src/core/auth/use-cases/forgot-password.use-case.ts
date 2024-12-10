import { ForgotPasswordSchema, ForgotPasswordInput, ForgotPasswordOutput } from '@starter/schema'
import { createUseCase, AuthError, IUseCaseExecute } from '@starter/domain'

import { env } from '@/config'
import { getTokenPayload } from '@/support/auth'

const SERVER_AUTHENTICATE_SECRET = env('SERVER_AUTHENTICATE_SECRET')

const execute: IUseCaseExecute<ForgotPasswordInput, ForgotPasswordOutput> =
  ({ Database, Encrypt, JWT }) =>
  async ({ email, password }) => {
    const user = await Database.user.findOne({ email })

    if (!user) {
      throw new AuthError('Invalid access data')
    }

    user.state.password = Encrypt.hash(password)

    await Database.user.updateById(user.state.id, user)

    const tokenPayload = getTokenPayload(user.state)

    const accessToken = JWT.generate(tokenPayload, SERVER_AUTHENTICATE_SECRET, { expiresIn: '7d' })

    return {
      accessToken,
    }
  }

export const forgotPassword = createUseCase(execute, ForgotPasswordSchema)
