import { addSeconds, subSeconds } from '@starter/common'
import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
} from '@starter/nestjs-error-handling'
import { describe, expect, it } from 'vitest'

import { OTPDomain } from '@/core/otp/otp.domain'
import { makeOTP } from '@/core/otp/otp.mock'
import { OTPContextEnum } from '@/core/otp/otp-context.schema'

describe('OTPDomain', () => {
	describe('checkIfCanResend', () => {
		it('should allow resend if cooldown passed', () => {
			const otp = makeOTP({
				createdAt: subSeconds(new Date(), 60).toISOString(),
			})
			expect(() => otp.checkIfCanResend(otp.state, 30)).not.toThrow()
		})

		it('should allow resend if there is no previous OTP sent', () => {
			const otp = makeOTP({
				createdAt: subSeconds(new Date(), 60).toISOString(),
			})
			expect(() => otp.checkIfCanResend(null, 30)).not.toThrow()
		})

		it('should throw ConflictException if cooldown not passed', () => {
			const otp = makeOTP({
				createdAt: new Date().toISOString(),
			})
			expect(() => otp.checkIfCanResend(otp.state, 30)).toThrowError(
				new ConflictException(
					'OTP insufficient resend time, please try again later.',
				),
			)
		})
	})

	describe('checkIfHasExpired', () => {
		it('should not throw if not expired', () => {
			const otp = makeOTP({
				expiresAt: addSeconds(new Date(), 60).toISOString(),
			})
			expect(() => otp.checkIfHasExpired()).not.toThrow()
		})

		it('should throw ForbiddenException if expired', () => {
			const otp = makeOTP({
				expiresAt: subSeconds(new Date(), 10).toISOString(),
			})
			expect(() => otp.checkIfHasExpired()).toThrowError(
				new ForbiddenException('OTP expired.'),
			)
		})
	})

	describe('checkIfAttemptsExceeded', () => {
		it('should not throw if attempts below max', () => {
			const otp = makeOTP({
				validationAttempts: 2,
			})
			expect(() => otp.checkIfAttemptsExceeded()).not.toThrow()
		})

		it('should throw ConflictException if attempts exceeded', () => {
			const otp = makeOTP({
				validationAttempts: 3,
			})
			expect(() => otp.checkIfAttemptsExceeded()).toThrowError(
				new ConflictException('OTP validation attempts exceeded.'),
			)
		})
	})

	describe('checkIfHasValidRecipient', () => {
		it('should not throw if recipient is valid', () => {
			const otp = makeOTP({
				recipient: 'valid@example.com',
			})
			expect(() =>
				otp.checkIfHasValidRecipient('valid@example.com'),
			).not.toThrow()
		})

		it('should throw BadRequestException if recipient is invalid', () => {
			const otp = makeOTP({
				recipient: 'expected@example.com',
			})
			expect(() =>
				otp.checkIfHasValidRecipient('wrong@example.com'),
			).toThrowError(BadRequestException)
		})
	})

	describe('checkIfHasValidContext', () => {
		it('should not throw if context is valid', () => {
			const otp = makeOTP({
				context: OTPContextEnum.FORGOT_PASSWORD,
			})
			expect(() =>
				otp.checkIfHasValidContext(OTPContextEnum.FORGOT_PASSWORD),
			).not.toThrow()
		})

		it('should throw BadRequestException if context is invalid', () => {
			const otp = makeOTP({
				context: OTPContextEnum.FORGOT_PASSWORD,
			})
			expect(() =>
				otp.checkIfHasValidContext('INVALID_CONTEXT' as OTPContextEnum),
			).toThrowError(BadRequestException)
		})
	})

	describe('checkIfHasValidCode', () => {
		it('should not throw if code is valid', () => {
			const otp = makeOTP({
				code: '1234',
			})
			expect(() => otp.checkIfHasValidCode('1234')).not.toThrow()
		})

		it('should throw BadRequestException and increment attempts if code is invalid', () => {
			const otp = makeOTP({
				code: OTPDomain.hashCode('9999'),
			})
			expect(() => otp.checkIfHasValidCode('1234')).toThrowError(
				BadRequestException,
			)
			expect(otp.state.validationAttempts).toBe(1)
		})
	})

	describe('checkIfHasReachedDailyLimit', () => {
		it('should not throw if daily count is below limit', () => {
			const otp = makeOTP({
				maxRequestsPerDay: 5,
			})
			expect(() => otp.checkIfHasReachedDailyLimit(4)).not.toThrow()
		})

		it('should throw ConflictException if daily limit exceeded', () => {
			const otp = makeOTP({
				maxRequestsPerDay: 5,
			})
			expect(() => otp.checkIfHasReachedDailyLimit(5)).toThrowError(
				new ConflictException('OTP daily request limit exceeded.'),
			)
		})
	})
})
