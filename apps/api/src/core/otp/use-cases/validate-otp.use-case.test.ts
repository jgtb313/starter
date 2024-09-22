import { beforeEach, describe, expect, it } from 'vitest'
import { OTPContextEnum, ValidateOTPInput } from '@starter/schema'

import { TestDependencies } from '@/config/tests'
import { IDependencies } from '@/core/shared/types'
import { OTP } from '@/core/otp/domain'

import { validateOTP } from './validate-otp.use-case'

describe('validateOTP', () => {
  let dependencies: IDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  it('should successfully send OTP to the user', async () => {
    const otp = new OTP({
      context: OTPContextEnum.UPDATE_EMAIL,
      email: 'john@doe.com'
    })

    const input: ValidateOTPInput = {
      id: otp.state.id,
      context: otp.state.context,
      code: otp.state.code
    }

    dependencies.Repositories.otp.create(otp)

    await expect(validateOTP(dependencies)(input)).resolves.not.toThrow()
    expect(dependencies.Repositories.otp.findById).toBeCalledWith(input.id)
    expect(dependencies.Repositories.otp.updateById).toBeCalledWith(input.id, otp)
  })
})
