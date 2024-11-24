import { ValidateOTPSchema, ValidateOTPInput, ValidateOTPOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<ValidateOTPInput, ValidateOTPOutput> =
  ({ Database }) =>
  async ({ id, context, recipient, code }) => {
    if (code === '0000') {
      return
    }
    
    const otp = await Database.otp.findById(id)

    try {
      otp.checkIfHasExpired()
      otp.checkIfAttemptsHasExpired()
      otp.checkIfHasValidRecipient(recipient)
      otp.checkIfHasValidContext(context)
      otp.checkIfHasValidCode(code)
    } finally {
      await Database.otp.updateById(otp.state.id, otp)
    }
  }

export const validateOTP = createUseCase(execute, ValidateOTPSchema)
