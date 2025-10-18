import crypto from 'crypto'

import { addSeconds, isBefore } from '@starter/common'
import { ConflictException } from '@starter/nestjs-error-handling'

import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import type { OTP } from '@/core/otp/otp.schema'
import type { OTPContext } from '@/core/otp/otp-context.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

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

@Injectable()
export class OTPContextDomain extends BaseDomain<OTPContextValue> {
	constructor(
		context: OTPContext,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(OTPContextValues[context])
	}

	checkIfCanResend(mostRecent: OTP | null) {
		if (!mostRecent) {
			return
		}

		const canResend = isBefore(
			addSeconds(mostRecent.createdAt, this.state.resendCooldownSeconds),
			new Date(),
		)

		if (!canResend) {
			throw new ConflictException(this.i18nService.current.otpResendCooldown())
		}
	}

	checkIfHasReachedDailyLimit(dailyCount: number) {
		const exceeded = dailyCount >= this.state.maxRequestsPerDay

		if (exceeded) {
			throw new ConflictException(
				this.i18nService.current.otpDailyLimitExceeded(),
			)
		}
	}
}
