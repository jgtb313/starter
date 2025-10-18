import crypto from 'crypto'

import { isFuture } from '@starter/common'
import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
} from '@starter/nestjs-error-handling'

import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type OTP, type OTPInput, OTPSchema } from '@/core/otp/otp.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class OTPDomain extends BaseDomain<OTP> {
	constructor(
		input: OTPInput,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(OTPSchema.parse(input))
	}

	static generateCode(code: string) {
		return crypto.createHash('sha256').update(code).digest('hex')
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
	}
}
