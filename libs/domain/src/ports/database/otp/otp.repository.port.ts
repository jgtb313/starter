import { OTP, BaseOTP, OTPContextEnum } from '@/core/otp/otp.schema'

export type IOTPRepository = {
  findById(otpId: string): Promise<OTP>
  findMostRecent(recipient: string, context: OTPContextEnum): Promise<OTP | null>
  countTodayAttempts(recipient: string, context: OTPContextEnum): Promise<number>
  create(input: BaseOTP): Promise<OTP>
  updateById(otpId: string, input: Partial<OTP>): Promise<OTP>
}
