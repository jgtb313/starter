import { NotFoundException } from '@starter/nestjs-error-handling'

import { OTPContextEnum } from '@/core/otp/otp-context.schema'

export type OTPContext = {
	context: OTPContextEnum
	maxRequestsPerDay: number
	resendCooldownSeconds: number
	maxValidationAttempts: number
	expirationTimeSeconds: number
}

export const OTPContexts: Record<OTPContextEnum, OTPContext> = {
	[OTPContextEnum.PASSWORD_LESS]: {
		context: OTPContextEnum.PASSWORD_LESS,
		maxRequestsPerDay: 60,
		resendCooldownSeconds: 60,
		maxValidationAttempts: 4,
		expirationTimeSeconds: 12000,
	},
	[OTPContextEnum.FORGOT_PASSWORD]: {
		context: OTPContextEnum.FORGOT_PASSWORD,
		maxRequestsPerDay: 60,
		resendCooldownSeconds: 60,
		maxValidationAttempts: 4,
		expirationTimeSeconds: 12000,
	},
	[OTPContextEnum.UPDATE_EMAIL]: {
		context: OTPContextEnum.UPDATE_EMAIL,
		maxRequestsPerDay: 60,
		resendCooldownSeconds: 60,
		maxValidationAttempts: 4,
		expirationTimeSeconds: 12000,
	},
	[OTPContextEnum.UPDATE_PHONE]: {
		context: OTPContextEnum.UPDATE_PHONE,
		maxRequestsPerDay: 60,
		resendCooldownSeconds: 60,
		maxValidationAttempts: 4,
		expirationTimeSeconds: 12000,
	},
}

export class OTPContextDomain {
	getContext(context: OTPContextEnum): OTPContext {
		const ctx = OTPContexts[context]

		if (!ctx) {
			throw new NotFoundException(`OTP context ${context} not found`)
		}

		return ctx
	}
}
