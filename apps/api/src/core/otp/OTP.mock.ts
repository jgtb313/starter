import { OTPChannelEnum, OTPContextEnum } from '@starter/schema'
import { uuid } from '@starter/shared'

import { OTP } from '@/core/otp/domain'

export const otpMocks = [
  new OTP({
    id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
    channel: OTPChannelEnum.EMAIL,
    context: OTPContextEnum.UPDATE_EMAIL,
    recipient: 'john.doe@acme.com',
    code: '1234',
    attempts: 1,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),

  new OTP({
    id: uuid(),
    channel: OTPChannelEnum.EMAIL,
    context: OTPContextEnum.UPDATE_EMAIL,
    recipient: 'jane.smith@beta.com',
    code: '5678',
    attempts: 2,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),

  new OTP({
    id: uuid(),
    channel: OTPChannelEnum.EMAIL,
    context: OTPContextEnum.UPDATE_EMAIL,
    recipient: 'alice.johnson@gamma.com',
    code: '9101',
    attempts: 0,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),

  new OTP({
    id: uuid(),
    channel: OTPChannelEnum.EMAIL,
    context: OTPContextEnum.UPDATE_EMAIL,
    recipient: 'bob.brown@delta.com',
    code: '1121',
    attempts: 0,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),

  new OTP({
    id: uuid(),
    channel: OTPChannelEnum.EMAIL,
    context: OTPContextEnum.UPDATE_EMAIL,
    recipient: 'charlie.davis@epsilon.com',
    code: '3141',
    attempts: 1,
    maxAttempts: 3,
    resendTime: 30,
    dailyLimitAttempts: 5,
    expiresIn: new Date(Date.now() + 15 * 60 * 1000),
  }),
]
