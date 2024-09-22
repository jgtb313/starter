import { describe, it, expect } from 'vitest'
import { OTPContextEnum } from '@starter/schema'

import { ConflictError, NotFoundError } from '@/support/errors'
import { OTP } from './OTP.domain'

describe('OTP Domain', () => {
  const validOTPData = {
    context: OTPContextEnum.UPDATE_EMAIL,
    email: 'test@example.com',
    code: '1234',
    maxAttempts: 3,
    dailyLimitAttempts: 5,
    resendTime: 60
  }

  it('should initialize OTP with default values', () => {
    const otp = new OTP(validOTPData)

    expect(otp.state.code).toBe(validOTPData.code)
    expect(otp.state.maxAttempts).toBe(validOTPData.maxAttempts)
    expect(otp.state.resendTime).toBe(validOTPData.resendTime)
    expect(otp.state.dailyLimitAttempts).toBe(validOTPData.dailyLimitAttempts)
    expect(otp.state.attempts).toBe(0)
    expect(otp.state.expiresIn).toBeInstanceOf(Date)
  })

  it('should throw NotFoundError for invalid context', () => {
    expect(() => new OTP({ ...validOTPData, context: 'invalid_context' as OTPContextEnum })).toThrow(NotFoundError)
  })

  it('should increase attempts', () => {
    const otp = new OTP(validOTPData)

    otp.increaseAttempt()

    expect(otp.state.attempts).toBe(1)
  })

  it('should not throw error if mostRecent is undefined', () => {
    const otp = new OTP(validOTPData)

    expect(() => otp.checkIfCanResend(undefined, otp.state.resendTime)).not.toThrow()
  })

  it('should throw ConflictError if resend time is insufficient', () => {
    const otp = new OTP(validOTPData)

    otp.state.createdAt = new Date()

    expect(() => otp.checkIfCanResend(otp, otp.state.resendTime)).toThrow(ConflictError)
  })

  it('should throw ConflictError for invalid context', () => {
    const otp = new OTP(validOTPData)

    expect(() => otp.checkIfHasValidContext('invalid_context')).toThrow(ConflictError)
  })

  it('should throw ConflictError for invalid code', () => {
    const otp = new OTP(validOTPData)

    expect(() => otp.checkIfHasValidCode('wrong_code')).toThrow(ConflictError)

    expect(otp.state.attempts).toBe(1)
  })

  it('should throw ConflictError if daily limit is reached', () => {
    const otp = new OTP(validOTPData)

    expect(() => otp.checkIfHasReachedDailyLimit(5)).toThrow(ConflictError)
  })

  it('should throw ConflictError if attempts have expired', () => {
    const otp = new OTP(validOTPData)
    otp.state.attempts = otp.state.maxAttempts

    expect(() => otp.checkIfAttemptsHasExpired()).toThrow(ConflictError)
  })

  it('should throw ConflictError if OTP has expired', () => {
    const otp = new OTP(validOTPData)

    otp.state.expiresIn = new Date()

    expect(() => otp.checkIfHasExpired()).toThrow(ConflictError)
  })
})
