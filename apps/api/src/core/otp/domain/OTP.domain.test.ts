import { describe, it, expect } from 'vitest'
import { OTPChannelEnum, OTPContextEnum } from '@starter/schema'

import { ConflictError, NotFoundError } from '@/support/errors'
import { OTP } from './OTP.domain'

describe('OTP Domain', () => {
  const otpData = {
    channel: OTPChannelEnum.EMAIL,
    context: OTPContextEnum.UPDATE_EMAIL,
    recipient: 'test@example.com',
    code: '1234',
    maxAttempts: 3,
    dailyLimitAttempts: 5,
    resendTime: 60,
  }

  it('should initialize OTP with default values', () => {
    const otp = new OTP(otpData)

    expect(otp.state.code).toBe(otpData.code)
    expect(otp.state.maxAttempts).toBe(otpData.maxAttempts)
    expect(otp.state.resendTime).toBe(otpData.resendTime)
    expect(otp.state.dailyLimitAttempts).toBe(otpData.dailyLimitAttempts)
    expect(otp.state.attempts).toBe(0)
    expect(otp.state.expiresIn).toBeInstanceOf(Date)
  })

  it('should throw NotFoundError for invalid context', () => {
    expect(() => new OTP({ ...otpData, context: 'invalid_context' as OTPContextEnum })).toThrow(NotFoundError)
  })

  it('should increase attempts', () => {
    const otp = new OTP(otpData)

    otp.increaseAttempt()

    expect(otp.state.attempts).toBe(1)
  })

  it('should not throw error if mostRecent is undefined', () => {
    const otp = new OTP(otpData)

    expect(() => otp.checkIfCanResend(undefined, otp.state.resendTime)).not.toThrow()
  })

  it('should throw ConflictError if resend time is insufficient', () => {
    const otp = new OTP(otpData)

    otp.state.createdAt = new Date()

    expect(() => otp.checkIfCanResend(otp, otp.state.resendTime)).toThrow(ConflictError)
  })

  it('should throw ConflictError for invalid recipient', () => {
    const otp = new OTP(otpData)

    expect(() => otp.checkIfHasValidRecipient('invalid_recipient')).toThrow(ConflictError)
  })

  it('should throw ConflictError for invalid context', () => {
    const otp = new OTP(otpData)

    expect(() => otp.checkIfHasValidContext('invalid_context')).toThrow(ConflictError)
  })

  it('should throw ConflictError for invalid code', () => {
    const otp = new OTP(otpData)

    expect(() => otp.checkIfHasValidCode('wrong_code')).toThrow(ConflictError)
    expect(otp.state.attempts).toBe(1)
  })

  it('should throw ConflictError if daily limit is reached', () => {
    const otp = new OTP(otpData)

    expect(() => otp.checkIfHasReachedDailyLimit(5)).toThrow(ConflictError)
  })

  it('should throw ConflictError if attempts have expired', () => {
    const otp = new OTP(otpData)
    otp.state.attempts = otp.state.maxAttempts

    expect(() => otp.checkIfAttemptsHasExpired()).toThrow(ConflictError)
  })

  it('should throw ConflictError if OTP has expired', () => {
    const otp = new OTP(otpData)

    otp.state.expiresIn = new Date()

    expect(() => otp.checkIfHasExpired()).toThrow(ConflictError)
  })
})
