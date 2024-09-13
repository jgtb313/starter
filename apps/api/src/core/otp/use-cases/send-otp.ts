import { SendOTPSchema, SendOTPInput, SendOTPOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'
import { OTP } from '@/core/otp/domain'
import { MailTemplateEnum } from '@/ports/mail'

const execute: IUseCaseExecute<SendOTPInput, Promise<SendOTPOutput>> =
  ({ Repositories, Mail }) =>
  async ({ context, email }) => {
    const otp = new OTP({
      context,
      email
    })

    const mostRecent = await Repositories.otp.mostRecent(email, context)

    otp.checkIfCanResend(mostRecent, otp.state.resendTime)

    const dailyCount = await Repositories.otp.dailyCount(email, context)

    otp.checkIfHasReachedDailyLimit(dailyCount)

    await Repositories.otp.create(otp)

    await Mail.send({
      template: MailTemplateEnum.SEND_OTP,
      to: email,
      props: {
        code: otp.state.code
      }
    })

    return {
      otp: otp.state.id
    }
  }

export const sendOTP = createUseCase(execute, SendOTPSchema)
