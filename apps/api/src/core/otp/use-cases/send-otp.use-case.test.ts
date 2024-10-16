import { beforeEach, describe, expect, it } from 'vitest'
import { OTPChannelEnum, OTPContextEnum, SendOTPInput } from '@starter/schema'
import { isString } from '@starter/shared'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'
import { MailTemplateEnum } from '@/ports/mail'
import { SMSTemplateEnum } from '@/ports/sms'
import { WhatsappTemplateEnum } from '@/ports/whatsapp'

import { sendOTP } from './send-otp.use-case'

describe('sendOTP', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof sendOTP>>[number]) => sendOTP(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully send email OTP to the user', async () => {
    const input: SendOTPInput = {
      userId: null,
      channel: OTPChannelEnum.EMAIL,
      context: OTPContextEnum.UPDATE_EMAIL,
      recipient: 'john@doe.com',
    }

    const output = await sut().execute(input)

    expect(dependencies.Repositories.otp.mostRecent).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Repositories.otp.dailyCount).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Repositories.otp.create).toBeCalled()
    expect(dependencies.Mail.send).toBeCalledWith({
      template: MailTemplateEnum.SEND_OTP,
      to: input.recipient,
      props: {
        code: expect.any(String),
      },
    })
    expect(isString(output.id)).toBe(true)
  })

  it('should successfully send sms OTP to the user', async () => {
    const input: SendOTPInput = {
      userId: null,
      channel: OTPChannelEnum.SMS,
      context: OTPContextEnum.UPDATE_PHONE,
      recipient: '+5598991143200',
    }

    const output = await sut().execute(input)

    expect(dependencies.Repositories.otp.mostRecent).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Repositories.otp.dailyCount).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Repositories.otp.create).toBeCalled()
    expect(dependencies.SMS.send).toBeCalledWith({
      template: SMSTemplateEnum.SEND_OTP,
      to: input.recipient,
      props: {
        code: expect.any(String),
      },
    })
    expect(isString(output.id)).toBe(true)
  })

  it('should successfully send sms OTP to the user', async () => {
    const input: SendOTPInput = {
      userId: null,
      channel: OTPChannelEnum.WHATSAPP,
      context: OTPContextEnum.UPDATE_PHONE,
      recipient: '+5598991143200',
    }

    const output = await sut().execute(input)

    expect(dependencies.Repositories.otp.mostRecent).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Repositories.otp.dailyCount).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Repositories.otp.create).toBeCalled()
    expect(dependencies.Whatsapp.send).toBeCalledWith({
      template: WhatsappTemplateEnum.SEND_OTP,
      to: input.recipient,
      props: {
        code: expect.any(String),
      },
    })
    expect(isString(output.id)).toBe(true)
  })
})
