import { addSeconds, uuid } from '@starter/common'

import type { OTP } from '@/core/otp/otp.schema'

type OTPOverrides = Partial<OTP>

export const makeOTP = (overrides: OTPOverrides): OTP => {
	const now = new Date()

	const base: OTP = {
		otpId: uuid(),
		userId: uuid(),
		channel: 'EMAIL',
		context: 'UPDATE_EMAIL',
		recipient: 'user@example.com',
		code: '1234',
		validationAttempts: 0,
		maxValidationAttempts: 3,
		maxRequestsPerDay: 5,
		resendCooldownSeconds: 30,
		expiresAt: addSeconds(now, 300),
		createdAt: now,
		updatedAt: now,
	}

	return {
		...base,
		...overrides,
	}
}

export const otpMocks: OTP[] = []
