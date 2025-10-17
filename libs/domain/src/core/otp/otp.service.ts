import { addSeconds, random, uuid } from '@starter/common'
import { ConflictException } from '@starter/nestjs-error-handling'
import type { Phone } from '@starter/schema'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import { OTPDomain } from '@/core/otp/otp.domain'
import type { OTP } from '@/core/otp/otp.schema'
import { OTPContextDomain } from '@/core/otp/otp-context.domain'
import { UserService } from '@/core/user/user.service'
import { NotificationService } from '@/adapters/notification'
import type { IOTPRepository } from '@/ports/database/otp'

@Injectable()
export class OTPService {
	constructor(
		@Inject('OTP_REPOSITORY') private readonly otpRepository: IOTPRepository,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		@Inject(forwardRef(() => NotificationService))
		private readonly notificationService: NotificationService,
	) {}

	async sendOTP({
		userId,
		channel,
		context,
		recipient,
	}: Pick<OTP, 'userId' | 'channel' | 'context' | 'recipient'>) {
		const ctx = new OTPContextDomain().getContext(context)

		const code = random(1000, 9999).toString()
		const hashedCode = OTPDomain.hashCode(code)

		const otp = new OTPDomain({
			otpId: uuid(),
			userId,
			channel,
			context,
			recipient,
			code: hashedCode,
			validationAttempts: 0,
			maxValidationAttempts: ctx.maxValidationAttempts,
			resendCooldownSeconds: ctx.resendCooldownSeconds,
			maxRequestsPerDay: ctx.maxRequestsPerDay,
			expiresAt: addSeconds(
				new Date(),
				ctx.resendCooldownSeconds,
			).toISOString(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		})

		const mostRecent = await this.otpRepository.findMostRecent(
			recipient,
			context,
		)

		otp.checkIfCanResend(
			mostRecent ? mostRecent.state : null,
			otp.state.resendCooldownSeconds,
		)

		const dailyCount = await this.otpRepository.countTodayAttempts(
			recipient,
			context,
		)

		otp.checkIfHasReachedDailyLimit(dailyCount)

		await this.otpRepository.create(otp.state)

		switch (channel) {
			case 'EMAIL':
				this.notificationService.send('EMAIL', {
					template: 'SEND_OTP',
					recipient,
					props: {
						code,
						expiresInMinutes: ctx.resendCooldownSeconds,
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
		} finally {
			await this.otpRepository.updateById(otp.state.otpId, otp.state)
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
