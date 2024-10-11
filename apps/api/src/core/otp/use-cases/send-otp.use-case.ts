import { SendOTPSchema, SendOTPInput, SendOTPOutput, OTPChannelEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'
import { OTP } from '@/core/otp/domain'
import { MailTemplateEnum } from '@/ports/mail'
import { SMSTemplateEnum } from '@/ports/sms'
import { WhatsappTemplateEnum } from '@/ports/whatsapp'

const execute: IUseCaseExecute<SendOTPInput, SendOTPOutput> =
  ({ Repositories, Mail, SMS, Whatsapp }) =>
  async ({ channel, context, recipient }) => {
    const otp = new OTP({
      channel,
      context,
      recipient,
    })

    const mostRecent = await Repositories.otp.mostRecent(recipient, context)

    otp.checkIfCanResend(mostRecent, otp.state.resendTime)

    const dailyCount = await Repositories.otp.dailyCount(recipient, context)

    otp.checkIfHasReachedDailyLimit(dailyCount)

    await Repositories.otp.create(otp)

    if (channel === OTPChannelEnum.EMAIL) {
      Mail.send({
        template: MailTemplateEnum.SEND_OTP,
        to: recipient,
        props: {
          code: otp.state.code,
        },
      })
    } else if (channel === OTPChannelEnum.SMS) {
      SMS.send({
        template: SMSTemplateEnum.SEND_OTP,
        to: recipient,
        props: {
          code: otp.state.code,
        },
      })
    } else if (channel === OTPChannelEnum.WHATSAPP) {
      Whatsapp.send({
        template: WhatsappTemplateEnum.SEND_OTP,
        to: recipient,
        props: {
          code: otp.state.code,
        },
      })
    }

    return {
      id: otp.state.id,
    }
  }

export const sendOTP = createUseCase(execute, SendOTPSchema)
