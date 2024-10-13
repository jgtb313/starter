import { OTPSchema, OTP as IOTP } from '@starter/schema'
import { random, addSeconds, isBefore, isFuture, PartialExcept } from '@starter/shared'

import { ConflictError } from '@/support/errors'
import { setupDomain, SetupDomain } from '@/support/utilities'
import { getContext } from './OTP.support'

export type OTPDomain = SetupDomain<IOTP>

export class OTP {
  state!: IOTP

  constructor(otp: PartialExcept<OTPDomain, 'channel' | 'context' | 'recipient'>) {
    const context = getContext(otp.context)

    Object.assign(this, {
      state: setupDomain(
        {
          ...otp,
          code: otp.code ?? random(1000, 9999).toString(),
          maxAttempts: otp.maxAttempts ?? context.maxAttempts,
          resendTime: otp.resendTime ?? context.resendTime,
          dailyLimitAttempts: otp.dailyLimitAttempts ?? context.dailyLimitAttempts,
          expiresIn: otp.expiresIn ?? addSeconds(new Date(), context.expiresIn),
        },
        OTPSchema,
      ),
    })
  }

  increaseAttempt() {
    this.state.attempts += 1
  }

  checkIfCanResend(mostRecent: OTP | undefined, resendTime: number) {
    if (!mostRecent) {
      return
    }

    const canResend = isBefore(addSeconds(new Date(mostRecent.state.createdAt), resendTime), new Date())

    if (!canResend) {
      throw new ConflictError('Insufficient resend time, please try again later')
    }
  }

  checkIfHasValidRecipient(recipient: string) {
    const hasValidRecipient = this.state.recipient === recipient

    if (!hasValidRecipient) {
      throw new ConflictError('Invalid recipient')
    }
  }

  checkIfHasValidContext(context: string) {
    const hasValidContext = this.state.context === context

    if (!hasValidContext) {
      throw new ConflictError('Invalid context')
    }
  }

  checkIfHasValidCode(code: string) {
    const hasValidCode = this.state.code === code

    if (!hasValidCode) {
      this.increaseAttempt()
      throw new ConflictError('Invalid code')
    }
  }

  checkIfHasReachedDailyLimit(dailyCount: number) {
    const hasReachedDailyLimit = dailyCount >= this.state.dailyLimitAttempts

    if (hasReachedDailyLimit) {
      throw new ConflictError('Daily attempt limit exceeded')
    }
  }

  checkIfAttemptsHasExpired() {
    const attemptsHasExpired = this.state.attempts >= this.state.maxAttempts

    if (attemptsHasExpired) {
      throw new ConflictError('Attempts expired')
    }
  }

  checkIfHasExpired() {
    const hasExpired = !isFuture(new Date(this.state.expiresIn))

    if (hasExpired) {
      throw new ConflictError('Expired')
    }
  }
}
