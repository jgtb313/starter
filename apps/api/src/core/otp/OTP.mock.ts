import { OTPContextEnum } from '@starter/schema'
import { uuid } from '@starter/shared'

import { OTP } from '@/core/otp/domain'

export const otpMocks = [
  new OTP({
    id: uuid(),
    context: OTPContextEnum.UPDATE_EMAIL,
    email: 'john.doe@acme.com',
    code: '1234',
    attempts: 1,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),

  new OTP({
    id: uuid(),
    context: OTPContextEnum.UPDATE_EMAIL,
    email: 'jane.smith@beta.com',
    code: '5678',
    attempts: 2,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),

  new OTP({
    id: uuid(),
    context: OTPContextEnum.UPDATE_EMAIL,
    email: 'alice.johnson@gamma.com',
    code: '9101',
    attempts: 0,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),

  new OTP({
    id: uuid(),
    context: OTPContextEnum.UPDATE_EMAIL,
    email: 'bob.brown@delta.com',
    code: '1121',
    attempts: 0,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),

  new OTP({
    id: uuid(),
    context: OTPContextEnum.UPDATE_EMAIL,
    email: 'charlie.davis@epsilon.com',
    code: '3141',
    attempts: 1,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),
]
