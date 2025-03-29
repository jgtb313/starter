import { Injectable, Inject, BadRequestException, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common'
import { random, getDate, addSeconds, isFuture, isBefore, Required } from '@starter/common'
import crypto from 'crypto'

import { getContext, User, OTP, BaseOTP, OTPChannelEnum, OTPContextEnum, OTPPhoneChannelEnum } from '@/schemas'
import { IOTPRepository } from '@/ports/database/otp'
import { NotificationService } from '@/adapters/notification'
import { UserService } from '@/core/user'

export type SendOTPInput = Pick<OTP, 'userId' | 'channel' | 'context' | 'recipient'>

export type SendPasswordLessInput = Pick<OTP, 'recipient'>

export type SendForgotPasswordInput = Pick<OTP, 'recipient'>

export type SendUpdateEmailInput = { userId: User['userId']; email: User['email'] }

export type SendUpdatePhoneInput = { channel: OTPPhoneChannelEnum; userId: User['userId']; phone: Required<User['phone']> }

export type ValidateOTPInput = Pick<OTP, 'otpId' | 'context' | 'recipient' | 'code'>

@Injectable()
export class OTPService {
  constructor(
    @Inject('OTP_REPOSITORY') private readonly otpRepository: IOTPRepository,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  async send({ userId, channel, context, recipient }: SendOTPInput): Promise<OTP> {
    const ctx = getContext(context)

    const code = random(1000, 9999).toString()
    const hashedCode = this.hashCode(code)

    const baseOTP: BaseOTP = {
      userId,
      channel,
      context,
      recipient,
      code: hashedCode,
      attempts: 0,
      maxAttempts: ctx.maxAttempts,
      resendTime: ctx.resendTime,
      dailyLimitAttempts: ctx.dailyLimitAttempts,
      expiresIn: addSeconds(new Date(), ctx.expiresIn),
    }

    const mostRecent = await this.otpRepository.mostRecent(recipient, context)

    this.checkIfCanResend(mostRecent, baseOTP.resendTime)

    const dailyCount = await this.otpRepository.dailyCount(recipient, context)

    this.checkIfHasReachedDailyLimit(baseOTP, dailyCount)

    const otp = await this.otpRepository.create(baseOTP)

    if (channel === OTPChannelEnum.EMAIL) {
      this.notificationService.send('EMAIL', {
        template: 'SEND_OTP',
        recipient,
        props: {
          code,
        },
      })
    } else if (channel === OTPChannelEnum.SMS) {
      this.notificationService.send('SMS', {
        template: 'SEND_OTP',
        recipient,
        props: {
          code,
        },
      })
    } else if (channel === OTPChannelEnum.WHATSAPP) {
      this.notificationService.send('WHATSAPP', {
        template: 'SEND_OTP',
        recipient,
        props: {
          code,
        },
      })
    }

    return otp
  }

  async validate({ otpId, context, recipient, code }: ValidateOTPInput) {
    if (code === '0000') {
      return
    }

    const otp = await this.otpRepository.findById(otpId)

    try {
      this.checkIfHasExpired(otp)
      this.checkIfAttemptsHasExpired(otp)
      this.checkIfHasValidRecipient(otp, recipient)
      this.checkIfHasValidContext(otp, context)
      this.checkIfHasValidCode(otp, code)
    } finally {
      await this.otpRepository.updateById(otp.otpId, otp)
    }
  }

  async sendPasswordLess({ recipient }: SendPasswordLessInput) {
    const user = await this.userService.findOne({ email: recipient })

    if (!user) {
      throw new NotFoundException(`Email ${recipient} not found.`)
    }

    const otp = await this.send({
      userId: null,
      channel: OTPChannelEnum.EMAIL,
      context: OTPContextEnum.PASSWORD_LESS,
      recipient,
    })

    return otp
  }

  async sendForgotPassword({ recipient }: SendForgotPasswordInput) {
    const user = await this.userService.findOne({ email: recipient })

    if (!user) {
      throw new NotFoundException(`Email ${recipient} not found.`)
    }

    const otp = await this.send({
      userId: null,
      channel: OTPChannelEnum.EMAIL,
      context: OTPContextEnum.FORGOT_PASSWORD,
      recipient,
    })

    return otp
  }

  async sendUpdateEmail({ userId, email }: SendUpdateEmailInput) {
    const recipient = email

    const existingUser = await this.userService.findOne({ email: recipient })

    if (existingUser && existingUser.userId !== userId) {
      throw new ConflictException(`Email ${recipient} has already been taken.`)
    }

    const otp = await this.send({
      userId,
      channel: OTPChannelEnum.EMAIL,
      context: OTPContextEnum.UPDATE_EMAIL,
      recipient,
    })

    return otp
  }

  async sendUpdatePhone({ userId, channel, phone }: SendUpdatePhoneInput) {
    const recipient = `${phone.ddi}${phone.number}`

    const existingUser = await this.userService.findOne({ phone })

    if (existingUser && existingUser.userId !== userId) {
      throw new ConflictException(`Phone ${recipient} has already been taken.`)
    }

    const otp = await this.send({
      userId,
      context: OTPContextEnum.UPDATE_PHONE,
      channel: channel === OTPPhoneChannelEnum.SMS ? OTPChannelEnum.SMS : OTPChannelEnum.WHATSAPP,
      recipient,
    })

    return otp
  }

  private hashCode(code: string): string {
    return crypto.createHash('sha256').update(code).digest('hex')
  }

  private checkIfCanResend(mostRecent: OTP | null, resendTime: number) {
    if (!mostRecent) {
      return
    }

    const canResend = isBefore(addSeconds(getDate(mostRecent.createdAt), resendTime), new Date())

    if (!canResend) {
      throw new ConflictException('OTP insufficient resend time, please try again later.')
    }
  }

  private checkIfHasValidRecipient(otp: OTP, recipient: string) {
    const hasValidRecipient = otp.recipient === recipient

    if (!hasValidRecipient) {
      throw new BadRequestException({
        issues: [
          {
            recipient: 'Invalid recipient',
          },
        ],
      })
    }
  }

  private checkIfHasValidContext(otp: OTP, context: string) {
    const hasValidContext = otp.context === context

    if (!hasValidContext) {
      throw new BadRequestException({
        issues: [
          {
            context: 'Invalid context',
          },
        ],
      })
    }
  }

  private checkIfHasValidCode(otp: OTP, code: string) {
    const hasValidCode = otp.code === this.hashCode(code)

    if (!hasValidCode) {
      otp.attempts++

      throw new BadRequestException({
        issues: [
          {
            code: 'Invalid code',
          },
        ],
      })
    }
  }

  private checkIfHasReachedDailyLimit(otp: Pick<OTP, 'dailyLimitAttempts'>, dailyCount: number) {
    const hasReachedDailyLimit = dailyCount >= otp.dailyLimitAttempts

    if (hasReachedDailyLimit) {
      throw new ConflictException('OTP daily attempt limit exceeded.')
    }
  }

  private checkIfAttemptsHasExpired(otp: OTP) {
    const attemptsHasExpired = otp.attempts >= otp.maxAttempts

    if (attemptsHasExpired) {
      throw new ConflictException('OTP attempts expired.')
    }
  }

  private checkIfHasExpired(otp: OTP) {
    const hasExpired = !isFuture(getDate(otp.expiresIn))

    if (hasExpired) {
      throw new ForbiddenException('OTP expired.')
    }
  }
}
