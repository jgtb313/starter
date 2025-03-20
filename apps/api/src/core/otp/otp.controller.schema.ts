import { z, EmailSchema, PhoneSchema } from '@starter/schema'
import { OTPSchema, OTPPhoneChannelEnum } from '@starter/domain'

export const SendOTPSchema = OTPSchema.pick({
  userId: true,
  channel: true,
  context: true,
  recipient: true,
})
export const SendOTPSchemaOutput = OTPSchema.pick({
  otpId: true,
})
export type SendOTPInput = z.infer<typeof SendOTPSchema>

export const ValidateOTPSchema = OTPSchema.pick({
  otpId: true,
  context: true,
  recipient: true,
  code: true,
})
export type ValidateOTPInput = z.infer<typeof ValidateOTPSchema>
export type ValidateOTPOutput = void

export const SendPasswordLessSchema = z.object({
  email: EmailSchema,
})
export const SendPasswordLessSchemaOutput = OTPSchema.pick({ otpId: true })
export type SendPasswordLessInput = z.infer<typeof SendPasswordLessSchema>

export const SendForgotPasswordOTPSchema = z.object({
  email: EmailSchema,
})
export const SendForgotPasswordOTPSchemaOutput = OTPSchema.pick({ otpId: true })
export type SendForgotPasswordOTPInput = z.infer<typeof SendForgotPasswordOTPSchema>

export const SendUpdateEmailOTPSchema = z.object({
  email: EmailSchema,
})
export const SendUpdateEmailOTPSchemaOutput = OTPSchema.pick({ otpId: true })
export type SendUpdateEmailOTPInput = z.infer<typeof SendUpdateEmailOTPSchema>

export const SendUpdatePhoneOTPSchema = z.object({
  channel: z.nativeEnum(OTPPhoneChannelEnum),
  phone: PhoneSchema,
})
export const SendUpdatePhoneOTPSchemaOutput = OTPSchema.pick({ otpId: true })
export type SendUpdatePhoneOTPInput = z.infer<typeof SendUpdatePhoneOTPSchema>
