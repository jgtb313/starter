import { OTPDomain } from '@/core/otp/otp.domain'
import { OTPContextEnum } from '@/core/otp/otp-context.domain'
import { OTP, BaseOTP } from '@/core/otp/otp.schema'

export type IOTPRepository = {
  findById(otpId: string): Promise<OTPDomain>
  findMostRecent(recipient: string, context: OTPContextEnum): Promise<OTPDomain | null>
  countTodayAttempts(recipient: string, context: OTPContextEnum): Promise<number>
  create(input: BaseOTP): Promise<OTPDomain>
  updateById(otpId: string, input: Partial<OTP>): Promise<OTPDomain>
}
