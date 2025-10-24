import { z } from '@starter/schema'

import type { BaseDomainInput } from '@/support/base-domain'
import { BaseSchema } from '@/support/base-schema'
import { OTPContextSchema } from '@/core/otp/otp-context.schema'

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
		example: 'EMAIL',
	})
export type OTPChannel = z.infer<typeof OTPChannelSchema>
export type OTPPhoneChannel = 'SMS' | 'WHATSAPP'

const Recipient = z.string().min(1).meta({
	description: 'Target recipient of the OTP (email or phone number)',
	example: 'user@example.com',
})

const Code = z.string().min(1).meta({
	description: 'One-time password code sent to the recipient',
	example: '438210',
})

const ValidationAttempts = z.number().default(0).meta({
	description: 'Number of unsuccessful OTP validation attempts',
	example: 0,
})

const MaxValidationAttempts = z.number().default(0).meta({
	description:
		'Maximum allowed failed validation attempts before OTP becomes invalid',
	example: 4,
})

const ResendCooldownSeconds = z.number().meta({
	description:
		'Time (in seconds) the user must wait before requesting the OTP again',
	example: 60,
})

const MaxRequestsPerDay = z.number().meta({
	description:
		'Maximum number of OTP requests allowed per recipient and context per day',
	example: 60,
})

const ExpiresAt = z.iso
	.datetime()
	.transform((value) => new Date(value))
	.meta({
		description: 'Date and time when the OTP expires (ISO format)',
		example: new Date(Date.now() + 1200000).toISOString(),
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

export const OTPInputSchema = OTPSchema.partial({
	otpId: true,
	createdAt: true,
	updatedAt: true,
})

export const UpdatableOTPInputSchema = OTPSchema.partial().omit({
	otpId: true,
	userId: true,
})

export type OTP = z.infer<typeof OTPSchema>
export type OTPInput = BaseDomainInput<z.input<typeof OTPInputSchema>>
export type UpdatableOTPInput = BaseDomainInput<
	z.input<typeof UpdatableOTPInputSchema>
>
