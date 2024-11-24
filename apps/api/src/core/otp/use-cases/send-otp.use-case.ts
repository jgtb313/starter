import { SendOTPSchema, SendOTPInput, SendOTPOutput, OTPChannelEnum } from '@starter/schema'
import { EmailsEnum } from '@starter/emails-marketing'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'
import { OTP } from '@/core/otp/domain'
import { SMSTemplateEnum } from '@/ports/sms'
import { WhatsappTemplateEnum } from '@/ports/whatsapp'

const execute: IUseCaseExecute<SendOTPInput, SendOTPOutput> =
  ({ Database, Mail, SMS, Whatsapp }) =>
  async ({ userId, channel, context, recipient }) => {
    const otp = new OTP({
      userId,
      channel,
      context,
      recipient,
    })

    const mostRecent = await Database.otp.mostRecent(recipient, context)

    otp.checkIfCanResend(mostRecent, otp.state.resendTime)

    const dailyCount = await Database.otp.dailyCount(recipient, context)

    otp.checkIfHasReachedDailyLimit(dailyCount)

    await Database.otp.create(otp)

    if (channel === OTPChannelEnum.EMAIL) {
      Mail.send({
        template: EmailsEnum.SEND_OTP,
        to: otp.state.recipient,
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
