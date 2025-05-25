import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { NotFoundException, ConflictException } from '@starter/nestjs-error-handling'
import { random, addSeconds } from '@starter/common'
import { Phone } from '@starter/schema'

import { OTPContexts, OTP, OTPChannelEnum, OTPContextEnum, OTPPhoneChannelEnum } from '@/core/otp/otp.schema'
import { IOTPRepository } from '@/ports/database/otp'
import { NotificationService } from '@/adapters/notification'
import { UserService } from '@/core/user/user.service'
import { OTPDomain } from '@/core/otp/otp.domain'

@Injectable()
export class OTPService {
  constructor(
    @Inject('OTP_REPOSITORY') private readonly otpRepository: IOTPRepository,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  async send({ userId, channel, context, recipient }: Pick<OTP, 'userId' | 'channel' | 'context' | 'recipient'>) {
    const ctx = this.getContext(context)

    const code = random(1000, 9999).toString()
    const hashedCode = OTPDomain.hashCode(code)

    const otp = new OTPDomain({
      userId,
      channel,
      context,
      recipient,
      code: hashedCode,
      attempts: 0,
      maxAttempts: ctx.maxAttempts,
      resendIntervalSeconds: ctx.resendTime,
      dailyLimitAttempts: ctx.dailyLimitAttempts,
      expiresAt: addSeconds(new Date(), ctx.expiresIn).toISOString(),
      otpId: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    const mostRecent = await this.otpRepository.findMostRecent(recipient, context)

    otp.checkIfCanResend(mostRecent ? mostRecent.state : null, otp.state.resendIntervalSeconds)

    const dailyCount = await this.otpRepository.countTodayAttempts(recipient, context)

    otp.checkIfHasReachedDailyLimit(dailyCount)

    await this.otpRepository.create(otp.state)

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

  async validate({ otpId, context, recipient, code }: Pick<OTP, 'otpId' | 'context' | 'recipient' | 'code'>) {
    const otp = await this.otpRepository.findById(otpId)

    try {
      otp.checkIfHasExpired()
      otp.checkIfAttemptsHasExpired()
      otp.checkIfHasValidRecipient(recipient)
      otp.checkIfHasValidContext(context)
      otp.checkIfHasValidCode(code)
    } finally {
      await this.otpRepository.updateById(otp.state.otpId, otp.state)
    }
  }

  async sendPasswordLess({ recipient }: Pick<OTP, 'recipient'>) {
    const user = await this.userService.getUserByEmail(recipient)

    if (!user) {
      return
    }

    const otp = await this.send({
      userId: user.userId,
      channel: OTPChannelEnum.EMAIL,
      context: OTPContextEnum.PASSWORD_LESS,
      recipient,
    })

    return otp
  }

  async sendForgotPassword({ recipient }: Pick<OTP, 'recipient'>) {
    const user = await this.userService.getUserByEmail(recipient)

    if (!user) {
      return
    }

    const otp = await this.send({
      userId: user.userId,
      channel: OTPChannelEnum.EMAIL,
      context: OTPContextEnum.FORGOT_PASSWORD,
      recipient,
    })

    return otp
  }

  async sendUpdateEmail({ userId, email }: { userId: string; email: string }) {
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

  async sendUpdatePhone(channel: OTPPhoneChannelEnum, { userId, phone }: { userId: string; phone: Phone }) {
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

  private getContext(context: OTPContextEnum) {
    const ctx = OTPContexts.find((ctx) => ctx.context === context)

    if (!ctx) {
      throw new NotFoundException(`OTP context ${context} not found`)
    }

    return ctx
  }
}
