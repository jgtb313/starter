import { OTPContextEnum } from '@starter/schema'

import { OTP } from '@/core/otp/domain'

export type IOTPRepository = () => {
  findById(id: string): Promise<OTP>
  dailyCount(email: string, context: OTPContextEnum): Promise<number>
  mostRecent(email: string, context: OTPContextEnum): Promise<OTP | undefined>
  create(data: OTP): Promise<OTP>
  updateById(id: string, data: Partial<OTP>): Promise<OTP>
}
