import crypto from 'crypto'

import { addSeconds, getDate, isBefore, isFuture } from '@starter/common'
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

	static hashCode(code: string) {
		return crypto.createHash('sha256').update(code).digest('hex')
	}

	checkIfCanResend(mostRecent: OTP | null, cooldownSeconds: number) {
		if (!mostRecent) return

		const canResend = isBefore(
			addSeconds(getDate(mostRecent.createdAt), cooldownSeconds),
			new Date(),
		)

		if (!canResend) {
			throw new ConflictException(
				'OTP insufficient resend time, please try again later.',
			)
		}
	}

	checkIfHasExpired() {
		const hasExpired = !isFuture(getDate(this.state.expiresAt))

		if (hasExpired) {
			throw new ForbiddenException('OTP expired.')
		}
	}

	checkIfAttemptsExceeded() {
		const exceeded =
			this.state.validationAttempts >= this.state.maxValidationAttempts

		if (exceeded) {
			throw new ConflictException('OTP validation attempts exceeded.')
		}
	}

	checkIfHasValidRecipient(recipient: string) {
		if (this.state.recipient !== recipient) {
			throw new BadRequestException({
				issues: [
					{
						recipient: 'Invalid recipient',
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
						context: 'Invalid context',
					},
				],
			})
		}
	}

	checkIfHasValidCode(code: string) {
		const hashed = OTPDomain.hashCode(code)

		if (this.state.code !== hashed) {
			this.state.validationAttempts++
			throw new BadRequestException({
				issues: [
					{
						code: 'Invalid code',
					},
				],
			})
		}
	}

	checkIfHasReachedDailyLimit(dailyCount: number) {
		const exceeded = dailyCount >= this.state.maxRequestsPerDay

		if (exceeded) {
			throw new ConflictException('OTP daily request limit exceeded.')
		}
	}
}
