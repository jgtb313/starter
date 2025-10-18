import { addSeconds, uuid } from '@starter/common'

import type { OTPInput } from '@/core/otp/otp.schema'

type OTPOverrides = Partial<OTPInput>

export const makeOTP = (overrides: OTPOverrides): OTPInput => {
	const now = new Date()

	const base: OTPInput = {
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
		expiresAt: addSeconds(now, 300).toISOString(),
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	}

	return {
		...base,
		...overrides,
	}
}

export const otpMocks: OTPInput[] = []
