import { addSeconds, random, uuid } from '@starter/common'
import { ConflictException } from '@starter/nestjs-error-handling'
import type { Phone } from '@starter/schema'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import { OTPDomain } from '@/core/otp/otp.domain'
import type { OTP, OTPInput } from '@/core/otp/otp.schema'
import { OTPContextDomain } from '@/core/otp/otp-context.domain'
import { UserService } from '@/core/user/user.service'
import { NotificationService } from '@/adapters/notification'
import type { IOTPRepository } from '@/ports/database/otp'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class OTPService {
	constructor(
		@Inject('OTP_REPOSITORY') private readonly otpRepository: IOTPRepository,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		@Inject(forwardRef(() => NotificationService))
		private readonly notificationService: NotificationService,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	async sendOTP({
		userId,
		channel,
		context,
		recipient,
	}: Pick<OTP, 'userId' | 'channel' | 'context' | 'recipient'>) {
		const otpContext = new OTPContextDomain(context, this.i18nService)

		const code = random(1000, 9999).toString()
		const hashedCode = OTPDomain.generateCode(code)

		const otpInput: OTPInput = {
			otpId: uuid(),
			userId,
			channel,
			context,
			recipient,
			code: hashedCode,
			validationAttempts: 0,
			maxValidationAttempts: otpContext.state.maxValidationAttempts,
			resendCooldownSeconds: otpContext.state.resendCooldownSeconds,
			maxRequestsPerDay: otpContext.state.maxRequestsPerDay,
			expiresAt: addSeconds(
				new Date(),
				otpContext.state.resendCooldownSeconds,
			).toISOString(),
		}

		const mostRecent = await this.otpRepository.findMostRecent(
			recipient,
			context,
		)

		otpContext.checkIfCanResend(mostRecent ? mostRecent.state : null)

		const dailyCount = await this.otpRepository.countTodayAttempts(
			recipient,
			context,
		)
		otpContext.checkIfHasReachedDailyLimit(dailyCount)

		const otp = await this.otpRepository.create(otpInput)

		switch (channel) {
			case 'EMAIL':
				this.notificationService.send('EMAIL', {
					template: 'SEND_OTP',
					recipient,
					props: {
						code,
						expiresInMinutes: otpContext.state.resendCooldownSeconds,
					},
				})
				break
			case 'SMS':
				this.notificationService.send('SMS', {
					template: 'SEND_OTP',
					recipient,
					props: {
						code,
					},
				})
				break
			case 'WHATSAPP':
				this.notificationService.send('WHATSAPP', {
					template: 'SEND_OTP',
					recipient,
					props: {
						code,
					},
				})
				break
		}

		return otp
	}

	async validateOTP({
		otpId,
		context,
		recipient,
		code,
	}: Pick<OTP, 'otpId' | 'context' | 'recipient' | 'code'>) {
		const otp = await this.otpRepository.findById(otpId)

		try {
			otp.checkIfHasExpired()
			otp.checkIfAttemptsExceeded()
			otp.checkIfHasValidRecipient(recipient)
			otp.checkIfHasValidContext(context)
			otp.checkIfHasValidCode(code)
		} catch (err) {
			await this.otpRepository.updateById(otp.state.otpId, {
				validationAttempts: otp.state.validationAttempts + 1,
			})
		}
	}

	async sendPasswordLess({ recipient }: Pick<OTP, 'recipient'>) {
		const user = await this.userService.getUserByEmail(recipient)

		if (!user) {
			return
		}

		return this.sendOTP({
			userId: user.state.userId,
			channel: 'EMAIL',
			context: 'PASSWORD_LESS',
			recipient,
		})
	}

	async sendForgotPassword({ recipient }: Pick<OTP, 'recipient'>) {
		const user = await this.userService.getUserByEmail(recipient)

		if (!user) {
			return
		}

		return this.sendOTP({
			userId: user.state.userId,
			channel: 'EMAIL',
			context: 'FORGOT_PASSWORD',
			recipient,
		})
	}

	async sendUpdateEmail({ userId, email }: { userId: string; email: string }) {
		const recipient = email

		const user = await this.userService.getUserByEmail(recipient)

		if (user && user.state.userId !== userId) {
			throw new ConflictException(`Email ${recipient} has already been taken.`)
		}

		return this.sendOTP({
			userId,
			channel: 'EMAIL',
			context: 'UPDATE_EMAIL',
			recipient,
		})
	}

	async sendUpdatePhone(
		channel: 'SMS' | 'WHATSAPP',
		{
			userId,
			phone,
		}: {
			userId: string
			phone: Phone
		},
	) {
		const recipient = `${phone.ddi}${phone.number}`

		const user = await this.userService.getUserByPhone(phone)

		if (user && user.state.userId !== userId) {
			throw new ConflictException(`Phone ${recipient} has already been taken.`)
		}

		return this.sendOTP({
			userId,
			context: 'UPDATE_PHONE',
			channel: channel === 'SMS' ? 'SMS' : 'WHATSAPP',
			recipient,
		})
	}
}
