import { ForgotPasswordSchema, ForgotPasswordInput, ForgotPasswordOutput } from '@starter/schema'
import { addMinutes, uuid } from '@starter/shared'

import { env } from '@/config'
import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'
import { MailTemplateEnum } from '@/ports/mail'

const execute: IUseCaseExecute<ForgotPasswordInput, ForgotPasswordOutput> =
  ({ Database, Mail }) =>
  async ({ email }) => {
    const recoverPasswordBaseUrl = env('SERVER_RECOVER_PASSWORD_BASE_URL')

    const user = await Database.user.findOne({ email })

    if (!user) {
      return
    }

    const recoverPasswordToken = uuid()
    const recoverPasswordExpiresIn = addMinutes(new Date(), 10)

    user.state.recoverPassword = {
      token: recoverPasswordToken,
      expiresIn: recoverPasswordExpiresIn,
    }

    Mail.send({
      template: MailTemplateEnum.FORGOT_PASSWORD,
      to: user.state.email,
      props: {
        userName: user.state.name,
        recoverPasswordBaseUrl: `${recoverPasswordBaseUrl}/${recoverPasswordToken}`,
      },
    })

    await Database.user.updateById(user.state.id, user)

    return
  }

export const forgotPassword = createUseCase(execute, ForgotPasswordSchema)
