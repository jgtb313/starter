import { addSeconds, uuid } from '@starter/common'

import { OTPDomain } from '@/core/otp/otp.domain'
import type { OTP } from '@/core/otp/otp.schema'

type OTPOverrides = Partial<OTP>

export const makeOTP = (overrides: OTPOverrides): OTPDomain => {
	const now = new Date()
	const code = OTPDomain.hashCode(overrides.code ?? '123456')

	const base: OTP = {
		otpId: uuid(),
		userId: uuid(),
		channel: 'EMAIL',
		context: 'UPDATE_EMAIL',
		recipient: 'user@example.com',
		code,
		validationAttempts: 0,
		maxValidationAttempts: 3,
		maxRequestsPerDay: 5,
		resendCooldownSeconds: 30,
		expiresAt: addSeconds(now, 300),
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	}

	return new OTPDomain({
		...base,
		...overrides,
	})
}

export const otpMocks: OTPDomain[] = []
