import type { OTPDomain } from '@/core/otp/otp.domain'
import type { OTP, OTPInput, UpdatableOTPInput } from '@/core/otp/otp.schema'

export type IOTPRepository = {
	findById(otpId: string): Promise<OTPDomain>
	findMostRecent(
		recipient: string,
		context: OTP['context'],
	): Promise<OTPDomain | null>
	countTodayAttempts(
		recipient: string,
		context: OTP['context'],
	): Promise<number>
	create(input: OTPInput): Promise<OTPDomain>
	updateById(otpId: string, input: UpdatableOTPInput): Promise<OTPDomain>
}
