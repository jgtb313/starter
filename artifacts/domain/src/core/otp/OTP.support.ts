import { OTPContextEnum, OTPContexts } from '@starter/schema'

import { NotFoundError } from '../../domain.errors'

export const getContext = (type: OTPContextEnum) => {
  const context = OTPContexts.find((otpContext) => otpContext.context === type)

  if (!context) {
    throw new NotFoundError(`OTP Context ${type} not found`)
  }

  return context
}
