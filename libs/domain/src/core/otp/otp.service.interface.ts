import { Phone } from '@starter/schema'

import { OTP, OTPPhoneChannelEnum } from '@/core/otp/otp.schema'

export interface IOTPService {
  send(input: Pick<OTP, 'userId' | 'channel' | 'context' | 'recipient'>): Promise<OTP>

  validate(input: Pick<OTP, 'otpId' | 'context' | 'recipient' | 'code'>): Promise<void>

  sendPasswordLess(input: Pick<OTP, 'recipient'>): Promise<OTP>

  sendForgotPassword(input: Pick<OTP, 'recipient'>): Promise<OTP>

  sendUpdateEmail(input: { userId: string; email: string }): Promise<OTP>

  sendUpdatePhone(channel: OTPPhoneChannelEnum, input: { userId: string; phone: Phone }): Promise<OTP>
}
