import { addSeconds, getDate, isBefore } from '@starter/common'
import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
} from '@starter/nestjs-error-handling'

import { beforeAll, describe, expect, it, vi } from 'vitest'

import { DomainContext } from '@/support/base-domain'
import { OTPDomain } from '@/core/otp/otp.domain'
import { makeOTP } from '@/core/otp/otp.mock'
import type { I18nDomainService } from '@/domain.i18n.module'

const mockI18nService = {
	current: {
		otpResendCooldown: vi.fn().mockReturnValue('Resend cooldown active'),
		otpExpired: vi.fn().mockReturnValue('OTP expired'),
		otpAttemptsExceeded: vi.fn().mockReturnValue('Attempts exceeded'),
		otpInvalidRecipient: vi.fn().mockReturnValue('Invalid recipient'),
		otpInvalidContext: vi.fn().mockReturnValue('Invalid context'),
		otpInvalidCode: vi.fn().mockReturnValue('Invalid code'),
		otpDailyLimitExceeded: vi.fn().mockReturnValue('Daily limit exceeded'),
	},
} as unknown as I18nDomainService

describe('OTPDomain', () => {
	beforeAll(() => {
		DomainContext.setI18nService(mockI18nService)
	})

	it('should render domain correctly', () => {
		const otp = makeOTP({})
		expect(otp.state).toBeDefined()
	})

	it('should generate code hash correctly', () => {
		const code = '123456'
		const hashedCode = OTPDomain.generateCode(code)
		expect(hashedCode).toBeDefined()
		expect(hashedCode).toMatch(/^[0-9a-f]{64}$/) // SHA-256 produces 64-char hex string
	})

	it('should allow resend if no recent OTP', () => {
		const otp = makeOTP({})
		expect(() => otp.checkIfCanResend(null, 60)).not.toThrow()
	})

	it('should block resend if cooldown not expired', () => {
		const now = new Date()
		const otp = makeOTP({
			createdAt: now.toISOString(),
		})
		const recentOTP = makeOTP({
			createdAt: addSeconds(now, -15).toISOString(),
		})
		const cooldownSeconds = 60

		expect(() =>
			otp.checkIfCanResend(recentOTP.state, cooldownSeconds),
		).toThrow(ConflictException)
		expect(mockI18nService.current.otpResendCooldown).toHaveBeenCalled()
	})

	it('should allow resend if cooldown expired', () => {
		const now = new Date()
		const otp = makeOTP({})
		const recentOTP = makeOTP({
			createdAt: new Date(now.getTime() - 61 * 1000).toISOString(), // 61 seconds ago
		})
		const cooldownSeconds = 60

		const cooldownEnd = addSeconds(
			getDate(recentOTP.state.createdAt),
			cooldownSeconds,
		)
		expect(isBefore(cooldownEnd, new Date())).toBe(true)
		expect(() =>
			otp.checkIfCanResend(recentOTP.state, cooldownSeconds),
		).not.toThrow()
	})

	it('should throw if OTP expired', () => {
		const otp = makeOTP({
			expiresAt: new Date(Date.now() - 1000).toISOString(), // Expired 1 second ago
		})
		expect(() => otp.checkIfHasExpired()).toThrow(ForbiddenException)
		expect(mockI18nService.current.otpExpired).toHaveBeenCalled()
	})

	it('should not throw if OTP not expired', () => {
		const otp = makeOTP({
			expiresAt: new Date(Date.now() + 1000 * 60).toISOString(), // Expires in 1 minute
		})
		expect(() => otp.checkIfHasExpired()).not.toThrow()
	})

	it('should throw if attempts exceeded', () => {
		const otp = makeOTP({
			validationAttempts: 3,
			maxValidationAttempts: 3,
		})
		expect(() => otp.checkIfAttemptsExceeded()).toThrow(ConflictException)
		expect(mockI18nService.current.otpAttemptsExceeded).toHaveBeenCalled()
	})

	it('should not throw if attempts not exceeded', () => {
		const otp = makeOTP({
			validationAttempts: 2,
			maxValidationAttempts: 3,
		})
		expect(() => otp.checkIfAttemptsExceeded()).not.toThrow()
	})

	it('should throw if recipient is invalid', () => {
		const otp = makeOTP({
			recipient: 'user@example.com',
		})
		expect(() => otp.checkIfHasValidRecipient('wrong@example.com')).toThrow(
			BadRequestException,
		)
		expect(mockI18nService.current.otpInvalidRecipient).toHaveBeenCalled()
	})

	it('should not throw if recipient is valid', () => {
		const otp = makeOTP({
			recipient: 'user@example.com',
		})
		expect(() => otp.checkIfHasValidRecipient('user@example.com')).not.toThrow()
	})

	it('should throw if context is invalid', () => {
		const otp = makeOTP({
			context: 'UPDATE_EMAIL',
		})
		expect(() => otp.checkIfHasValidContext('signup')).toThrow(
			BadRequestException,
		)
		expect(mockI18nService.current.otpInvalidContext).toHaveBeenCalled()
	})

	it('should not throw if context is valid', () => {
		const otp = makeOTP({
			context: 'UPDATE_EMAIL',
		})
		expect(() => otp.checkIfHasValidContext('UPDATE_EMAIL')).not.toThrow()
	})

	it('should throw if code is invalid', () => {
		const otp = makeOTP({
			code: OTPDomain.generateCode('123456'),
		})
		expect(() => otp.checkIfHasValidCode('654321')).toThrow(BadRequestException)
		expect(mockI18nService.current.otpInvalidCode).toHaveBeenCalled()
	})

	it('should return state if code is valid', () => {
		const otp = makeOTP({
			code: OTPDomain.generateCode('123456'),
		})
		const result = otp.checkIfHasValidCode('123456')
		expect(result).toEqual(otp.state)
	})

	it('should throw if daily limit exceeded', () => {
		const otp = makeOTP({
			maxRequestsPerDay: 5,
		})
		expect(() => otp.checkIfHasReachedDailyLimit(5)).toThrow(ConflictException)
		expect(mockI18nService.current.otpDailyLimitExceeded).toHaveBeenCalled()
	})

	it('should not throw if daily limit not exceeded', () => {
		const otp = makeOTP({
			maxRequestsPerDay: 5,
		})
		expect(() => otp.checkIfHasReachedDailyLimit(4)).not.toThrow()
	})
})
