import crypto from 'crypto'

import { addSeconds, isBefore, isFuture } from '@starter/common'
import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
} from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import { type OTP, type OTPInput, OTPSchema } from '@/core/otp/otp.schema'

export class OTPDomain extends BaseDomain<OTP, OTPInput> {
	constructor(input: OTPInput) {
		super(OTPSchema, input)
	}

	static generateCode(code: string) {
		return crypto.createHash('sha256').update(code).digest('hex')
	}

	checkIfCanResend(mostRecent: OTP | null, cooldownSeconds: number) {
		if (!mostRecent) {
			return
		}

		const canResend = isBefore(
			addSeconds(mostRecent.createdAt, cooldownSeconds),
			new Date(),
		)

		if (!canResend) {
			throw new ConflictException(this.i18nService.current.otpResendCooldown())
		}
	}

	checkIfHasExpired() {
		const hasExpired = !isFuture(this.state.expiresAt)

		if (hasExpired) {
			throw new ForbiddenException(this.i18nService.current.otpExpired())
		}
	}

	checkIfAttemptsExceeded() {
		const exceeded =
			this.state.validationAttempts >= this.state.maxValidationAttempts

		if (exceeded) {
			throw new ConflictException(
				this.i18nService.current.otpAttemptsExceeded(),
			)
		}
	}

	checkIfHasValidRecipient(recipient: string) {
		if (this.state.recipient !== recipient) {
			throw new BadRequestException({
				issues: [
					{
						recipient: this.i18nService.current.otpInvalidRecipient(),
					},
				],
			})
		}
	}

	checkIfHasValidContext(context: string) {
		if (this.state.context !== context) {
			throw new BadRequestException({
				issues: [
					{
						context: this.i18nService.current.otpInvalidContext(),
					},
				],
			})
		}
	}

	checkIfHasValidCode(code: string) {
		const hashed = OTPDomain.generateCode(code)

		if (this.state.code !== hashed) {
			throw new BadRequestException({
				issues: [
					{
						code: this.i18nService.current.otpInvalidCode(),
					},
				],
			})
		}

		return this.state
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
