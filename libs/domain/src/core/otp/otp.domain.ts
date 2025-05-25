import { ConflictException, BadRequestException, ForbiddenException, NotFoundException } from '@starter/nestjs-error-handling'
import { getDate, addSeconds, isFuture, isBefore } from '@starter/common'
import crypto from 'crypto'

import { BaseDomain } from '@/support/base-domain'
import { OTPSchema, OTP, OTPInput } from '@/core/otp/otp.schema'

export class OTPDomain extends BaseDomain<OTP, OTPInput> {
  constructor(input: OTPInput) {
    super(OTPSchema, input)
  }

  static hashCode(code: string) {
    return crypto.createHash('sha256').update(code).digest('hex')
  }

  checkIfCanResend(mostRecent: OTP | null, resendTime: number) {
    if (!mostRecent) return

    const canResend = isBefore(addSeconds(getDate(mostRecent.createdAt), resendTime), new Date())

    if (!canResend) {
      throw new ConflictException('OTP insufficient resend time, please try again later.')
    }
  }

  checkIfHasExpired() {
    const hasExpired = !isFuture(getDate(this.state.expiresAt))

    if (hasExpired) {
      throw new ForbiddenException('OTP expired.')
    }
  }

  checkIfAttemptsHasExpired() {
    const attemptsHasExpired = this.state.attempts >= this.state.maxAttempts

    if (attemptsHasExpired) {
      throw new ConflictException('OTP attempts expired.')
    }
  }

  checkIfHasValidRecipient(recipient: string) {
    if (this.state.recipient !== recipient) {
      throw new BadRequestException({
        issues: [{ recipient: 'Invalid recipient' }],
      })
    }
  }

  checkIfHasValidContext(context: string) {
    if (this.state.context !== context) {
      throw new BadRequestException({
        issues: [{ context: 'Invalid context' }],
      })
    }
  }

  checkIfHasValidCode(code: string) {
    const hashed = OTPDomain.hashCode(code)

    if (this.state.code !== hashed) {
      this.state.attempts++
      throw new BadRequestException({
        issues: [{ code: 'Invalid code' }],
      })
    }
  }

  checkIfHasReachedDailyLimit(dailyCount: number) {
    const hasReachedDailyLimit = dailyCount >= this.state.dailyLimitAttempts

    if (hasReachedDailyLimit) {
      throw new ConflictException('OTP daily attempt limit exceeded.')
    }
  }
}
