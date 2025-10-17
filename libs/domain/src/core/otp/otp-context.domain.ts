import { NotFoundException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import type { OTPContext, OTPContextInput } from '@/core/otp/otp-context.schema'

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

export class OTPContextDomain extends BaseDomain<OTPContext, OTPContextInput> {
	getContext(context: OTPContext): OTPContextValue {
		const otpContext = OTPContextValues[context]

		if (!otpContext) {
			throw new NotFoundException(
				this.i18nService.current.otpContextNotFound({
					context,
				}),
			)
		}

		return otpContext
	}
}
