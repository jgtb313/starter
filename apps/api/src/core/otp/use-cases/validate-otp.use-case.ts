import { ValidateOTPSchema, ValidateOTPInput, ValidateOTPOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ValidateOTPInput, ValidateOTPOutput> =
  ({ Repositories }) =>
  async ({ id, context, code }) => {
    const otp = await Repositories.otp.findById(id)

    try {
      otp.checkIfHasExpired()
      otp.checkIfAttemptsHasExpired()
      otp.checkIfHasValidContext(context)
      otp.checkIfHasValidCode(code)
    } finally {
      await Repositories.otp.updateById(otp.state.id, otp)
    }
  }

export const validateOTP = createUseCase(execute, ValidateOTPSchema)
