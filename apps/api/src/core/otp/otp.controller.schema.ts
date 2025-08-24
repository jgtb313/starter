import { OTPPhoneChannelEnum, OTPSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'
import { EmailSchema, PhoneSchema, z } from '@starter/schema'

export const SendOTPSchema = createRequestSchema({
	body: OTPSchema.pick({
		userId: true,
		channel: true,
		context: true,
		recipient: true,
	}),
	output: OTPSchema.pick({
		otpId: true,
	}),
})
export type SendOTPRequest = RequestInput<typeof SendOTPSchema>

export const ValidateOTPSchema = createRequestSchema({
	params: OTPSchema.pick({
		otpId: true,
	}),
	body: OTPSchema.pick({
		context: true,
		recipient: true,
		code: true,
	}),
})
export type ValidateOTPRequest = RequestInput<typeof ValidateOTPSchema>

export const SendPasswordLessSchema = createRequestSchema({
	body: z.object({
		email: EmailSchema,
	}),
	output: OTPSchema.pick({
		otpId: true,
	}),
})
export type SendPasswordLessRequest = RequestInput<
	typeof SendPasswordLessSchema
>

export const SendForgotPasswordOTPSchema = createRequestSchema({
	body: z.object({
		email: EmailSchema,
	}),
	output: OTPSchema.pick({
		otpId: true,
	}),
})
export type SendForgotPasswordOTPRequest = RequestInput<
	typeof SendForgotPasswordOTPSchema
>

export const SendUpdateEmailOTPSchema = createRequestSchema({
	body: z.object({
		email: EmailSchema,
	}),
	output: OTPSchema.pick({
		otpId: true,
	}),
})
export type SendUpdateEmailOTPRequest = RequestInput<
	typeof SendUpdateEmailOTPSchema
>

export const SendUpdatePhoneOTPSchema = createRequestSchema({
	body: z.object({
		channel: z.nativeEnum(OTPPhoneChannelEnum),
		phone: PhoneSchema,
	}),
	output: OTPSchema.pick({
		otpId: true,
	}),
})
export type SendUpdatePhoneOTPRequest = RequestInput<
	typeof SendUpdatePhoneOTPSchema
>
