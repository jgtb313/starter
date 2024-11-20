import { ForgotPasswordSchema, ForgotPasswordInput, ForgotPasswordOutput } from '@starter/schema'

import { env } from '@/config'
import { AuthError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'
import { MailTemplateEnum } from '@/ports/mail'
import { getTokenPayload } from '@/support/auth'

const execute: IUseCaseExecute<ForgotPasswordInput, ForgotPasswordOutput> =
  ({ Database, Mail, JWT }) =>
  async ({ email }) => {
    const SERVER_AUTHENTICATE_SECRET = env('SERVER_AUTHENTICATE_SECRET')

    const user = await Database.user.findOne({ email })

    if (!user) {
      throw new AuthError('Invalid access dat')
    }

    Mail.send({
      template: MailTemplateEnum.FORGOT_PASSWORD,
      to: user.state.email,
      props: {
        userName: user.state.name,
        recoverPasswordBaseUrl: '',
      },
    })

    await Database.user.updateById(user.state.id, user)

    const tokenPayload = getTokenPayload(user.state)

    const accessToken = JWT.generate(tokenPayload, SERVER_AUTHENTICATE_SECRET, { expiresIn: '7d' })

    return {
      accessToken,
    }
  }

export const forgotPassword = createUseCase(execute, ForgotPasswordSchema)
