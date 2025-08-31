import { NotFoundException } from '@starter/nestjs-error-handling'

import type { OTPContext } from '@/core/otp/otp-context.schema'

export type OTPContextValue = {
	context: OTPContext
	maxRequestsPerDay: number
	resendCooldownSeconds: number
	maxValidationAttempts: number
	expirationTimeSeconds: number
}

export const OTPContextValues: Record<OTPContext, OTPContextValue> = {
	PASSWORD_LESS: {
		context: 'PASSWORD_LESS',
		maxRequestsPerDay: 60,
		resendCooldownSeconds: 60,
		maxValidationAttempts: 4,
		expirationTimeSeconds: 12000,
	},
	FORGOT_PASSWORD: {
		context: 'FORGOT_PASSWORD',
		maxRequestsPerDay: 60,
		resendCooldownSeconds: 60,
		maxValidationAttempts: 4,
		expirationTimeSeconds: 12000,
	},
	UPDATE_EMAIL: {
		context: 'UPDATE_EMAIL',
		maxRequestsPerDay: 60,
		resendCooldownSeconds: 60,
		maxValidationAttempts: 4,
		expirationTimeSeconds: 12000,
	},
	UPDATE_PHONE: {
		context: 'UPDATE_PHONE',
		maxRequestsPerDay: 60,
		resendCooldownSeconds: 60,
		maxValidationAttempts: 4,
		expirationTimeSeconds: 12000,
	},
}

export class OTPContextDomain {
	getContext(context: OTPContext): OTPContextValue {
		const value = OTPContextValues[context]

		if (!value) {
			throw new NotFoundException(`OTP context ${context} not found`)
		}

		return value
	}
}
