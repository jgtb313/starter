import { uuid, addSeconds } from '@starter/common'

import { OTPDomain } from '@/core/otp/otp.domain'
import { OTPContextEnum } from '@/core/otp/otp-context.domain'
import { OTPInput, OTPChannelEnum } from '@/core/otp/otp.schema'

type OTPOverrides = Partial<OTPInput>

export const makeOTP = (overrides: OTPOverrides = {}) => {
  const now = new Date()
  const code = OTPDomain.hashCode(overrides.code ?? '123456')

  const base: OTPInput = {
    otpId: uuid(),
    userId: uuid(),
    channel: OTPChannelEnum.EMAIL,
    context: OTPContextEnum.UPDATE_EMAIL,
    recipient: 'user@example.com',
    code,
    validationAttempts: 0,
    maxValidationAttempts: 3,
    maxRequestsPerDay: 5,
    resendCooldownSeconds: 30,
    expiresAt: addSeconds(now, 300).toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }

  return new OTPDomain({
    ...base,
    ...overrides,
    code,
  })
}

export const otpMocks: OTPDomain[] = [
  makeOTP({ recipient: 'active1@example.com', context: OTPContextEnum.UPDATE_EMAIL }),
  makeOTP({ recipient: 'expired@example.com', expiresAt: addSeconds(new Date(), -60).toISOString() }),
  makeOTP({ recipient: 'maxed@example.com', validationAttempts: 3 }),
  makeOTP({ recipient: 'resend@example.com', createdAt: new Date().toISOString() }),
  makeOTP({ recipient: 'phone@example.com', channel: OTPChannelEnum.EMAIL, context: OTPContextEnum.UPDATE_PHONE }),
  makeOTP({ recipient: 'limit@example.com', maxRequestsPerDay: 2 }),
  makeOTP({ recipient: 'wrong-code@example.com', code: OTPDomain.hashCode('000000') }),
  makeOTP({ recipient: 'deleted@example.com', updatedAt: addSeconds(new Date(), -10000).toISOString() }),
  makeOTP({ recipient: 'context-test@example.com', context: OTPContextEnum.FORGOT_PASSWORD }),
  makeOTP({ recipient: 'low-attempt@example.com', validationAttempts: 1 }),
]
