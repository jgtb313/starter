import { z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

import { OTPContext } from '@/core/otp/otp-context.schema'

export type OTPChannelEnum = 'EMAIL' | 'SMS' | 'WHATSAPP'

export type OTPPhoneChannelEnum = 'SMS' | 'WHATSAPP'

const OTPId = BaseSchema.id('otp')

const UserId = BaseSchema.id('user')
	.nullish()
	.transform((value) => value ?? null)

const OTPChannelSchema = z
	.enum([
		'EMAIL',
		'SMS',
		'WHATSAPP',
	])
	.meta({
		description: 'Channel through which the OTP is delivered',
		example: [
			'EMAIL',
			'SMS',
			'WHATSAPP',
		],
	})
export type OTPChannel = z.infer<typeof OTPChannelSchema>

const OTPContextSchema = OTPContext.meta({
	description: 'Business scenario for which the OTP is generated',
	example: [
		'PASSWORD_LESS',
		'FORGOT_PASSWORD',
		'UPDATE_EMAIL',
		'UPDATE_PHONE',
	],
})

const Recipient = z
	.string()
	.min(1)
	.meta({
		description: 'Target recipient of the OTP (email or phone number)',
		example: [
			'user@example.com',
			'+15555555555',
		],
	})

const Code = z
	.string()
	.min(1)
	.meta({
		description: 'One-time password code sent to the recipient',
		example: [
			'438210',
		],
	})

const ValidationAttempts = z
	.number()
	.default(0)
	.meta({
		description: 'Number of unsuccessful OTP validation attempts',
		example: [
			0,
			1,
		],
	})

const MaxValidationAttempts = z
	.number()
	.default(0)
	.meta({
		description:
			'Maximum allowed failed validation attempts before OTP becomes invalid',
		example: [
			4,
		],
	})

const ResendCooldownSeconds = z.number().meta({
	description:
		'Time (in seconds) the user must wait before requesting the OTP again',
	example: [
		60,
	],
})

const MaxRequestsPerDay = z.number().meta({
	description:
		'Maximum number of OTP requests allowed per recipient and context per day',
	example: [
		60,
	],
})

const ExpiresAt = z.iso
	.datetime()
	.transform((value) => new Date(value))
	.meta({
		description: 'Date and time when the OTP expires (ISO format)',
		example: [
			new Date(Date.now() + 1200000).toISOString(),
		],
	})

export const OTPSchema = z.object({
	otpId: OTPId,
	userId: UserId,
	channel: OTPChannelSchema,
	context: OTPContextSchema,
	recipient: Recipient,
	code: Code,
	validationAttempts: ValidationAttempts,
	maxValidationAttempts: MaxValidationAttempts,
	resendCooldownSeconds: ResendCooldownSeconds,
	maxRequestsPerDay: MaxRequestsPerDay,
	expiresAt: ExpiresAt,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

export type OTP = z.infer<typeof OTPSchema>
export type OTPInput = z.input<typeof OTPSchema>
export type BaseOTP = BaseSchema<
	OTP,
	{
		optional: [
			'otpId',
		]
	}
>
