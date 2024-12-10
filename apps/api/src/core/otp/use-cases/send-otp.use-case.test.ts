import { vi, beforeEach, describe, expect, it } from 'vitest'
import { OTPChannelEnum, OTPContextEnum, SendOTPInput } from '@starter/schema'
import { createTestDependencies, SMSTemplateEnum, WhatsappTemplateEnum, IDependencies, ITestDependencies } from '@starter/domain'
import { EmailsEnum } from '@starter/emails-marketing'
import { isString } from '@starter/shared'

import { sendOTP } from './send-otp.use-case'

describe('sendOTP', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof sendOTP>>[number]) => sendOTP(dependencies as IDependencies)(input),
  })

  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = createTestDependencies(vi)
  })

  it('should successfully send email OTP to the user', async () => {
    const input: SendOTPInput = {
      userId: null,
      channel: OTPChannelEnum.EMAIL,
      context: OTPContextEnum.UPDATE_EMAIL,
      recipient: 'john@doe.com',
    }

    const output = await sut().execute(input)

    expect(dependencies.Database.otp.mostRecent).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Database.otp.dailyCount).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Database.otp.create).toBeCalled()
    expect(dependencies.Mail.send).toBeCalledWith({
      template: EmailsEnum.SEND_OTP,
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

    expect(dependencies.Database.otp.mostRecent).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Database.otp.dailyCount).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Database.otp.create).toBeCalled()
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

    expect(dependencies.Database.otp.mostRecent).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Database.otp.dailyCount).toBeCalledWith(input.recipient, input.context)
    expect(dependencies.Database.otp.create).toBeCalled()
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
