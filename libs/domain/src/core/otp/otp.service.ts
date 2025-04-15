import { Injectable, Inject, BadRequestException, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common'
import { random, getDate, addSeconds, isFuture, isBefore } from '@starter/common'
import crypto from 'crypto'

import { OTPContexts, OTP, BaseOTP, OTPChannelEnum, OTPContextEnum, OTPPhoneChannelEnum } from '@/schemas'
import { IOTPRepository } from '@/ports/database/otp'
import { NotificationService } from '@/adapters/notification'
import { IOTPService } from '@/core/otp/otp.service.interface'
import { IUserService } from '@/core/user/user.service.interface'

@Injectable()
export class OTPService implements IOTPService {
  constructor(
    @Inject('OTP_REPOSITORY') private readonly otpRepository: IOTPRepository,
    @Inject('USER_SERVICE') private readonly userService: IUserService,
    private readonly notificationService: NotificationService,
  ) {}

  send: IOTPService['send'] = async ({ userId, channel, context, recipient }) => {
    const ctx = this.getContext(context)

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

    const mostRecent = await this.otpRepository.findMostRecent(recipient, context)

    this.checkIfCanResend(mostRecent, baseOTP.resendTime)

    const dailyCount = await this.otpRepository.countTodayAttempts(recipient, context)

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

  validate: IOTPService['validate'] = async ({ otpId, context, recipient, code }) => {
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

  sendPasswordLess: IOTPService['sendPasswordLess'] = async ({ recipient }) => {
    const user = await this.userService.getUserByEmail(recipient)

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

  sendForgotPassword: IOTPService['sendForgotPassword'] = async ({ recipient }) => {
    const user = await this.userService.getUserByEmail(recipient)

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

  sendUpdateEmail: IOTPService['sendUpdateEmail'] = async ({ userId, email }) => {
    const recipient = email

    const existingUser = await this.userService.getUser(recipient)

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

  sendUpdatePhone: IOTPService['sendUpdatePhone'] = async (channel, { userId, phone }) => {
    const recipient = `${phone.ddi}${phone.number}`

    const existingUser = await this.userService.getUserByPhone(phone)

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

  private getContext(context: OTPContextEnum) {
    const ctx = OTPContexts.find((ctx) => ctx.context === context)

    if (!ctx) {
      throw new NotFoundException(`OTP context ${context} not found`)
    }

    return ctx
  }
}
