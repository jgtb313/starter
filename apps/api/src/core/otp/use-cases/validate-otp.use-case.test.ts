import { beforeEach, describe, expect, it } from 'vitest'
import { OTPChannelEnum, OTPContextEnum, ValidateOTPInput } from '@starter/schema'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'
import { OTP } from '@/core/otp/domain'

import { validateOTP } from './validate-otp.use-case'

describe('validateOTP', () => {
  const sut = () => ({
    execute: (input: Parameters<ReturnType<typeof validateOTP>>[number]) => validateOTP(dependencies as IDependencies)(input),
  })
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await TestDependencies()
  })

  it('should successfully send OTP to the user', async () => {
    const otp = new OTP({
      channel: OTPChannelEnum.EMAIL,
      context: OTPContextEnum.UPDATE_EMAIL,
      recipient: 'john@doe.com',
    })

    const input: ValidateOTPInput = {
      id: otp.state.id,
      context: otp.state.context,
      recipient: otp.state.recipient,
      code: otp.state.code,
    }

    dependencies.Database.otp.create(otp)

    await expect(sut().execute(input)).resolves.not.toThrow()
    expect(dependencies.Database.otp.findById).toBeCalledWith(input.id)
  })
})
