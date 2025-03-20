import { OTP, BaseOTP, OTPContextEnum } from '@/schemas'

export type IOTPRepository = {
  findById(userId: string): Promise<OTP>
  dailyCount(recipient: string, context: OTPContextEnum): Promise<number>
  mostRecent(recipient: string, context: OTPContextEnum): Promise<OTP | null>
  create(input: BaseOTP): Promise<OTP>
  updateById(userId: string, input: Partial<OTP>): Promise<OTP>
}
