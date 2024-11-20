import { z } from '@/zod'

import { ID, EmailSchema, PhoneSchema } from '@/common'
import { OTPSchema } from './OTP.schema'
import { OTPPhoneChannelEnum } from './OTP.enums'

export const OTPVerificationSchema = OTPSchema.pick({
  id: true,
  code: true,
})

export const SendOTPSchema = OTPSchema.pick({
  userId: true,
  channel: true,
  context: true,
  recipient: true,
})
export const SendOTPSchemaOutput = OTPSchema.pick({
  id: true,
})
export type SendOTPInput = z.infer<typeof SendOTPSchema>
export type SendOTPOutput = z.infer<typeof SendOTPSchemaOutput>

export const ValidateOTPSchema = OTPSchema.pick({
  id: true,
  context: true,
  recipient: true,
  code: true,
})
export type ValidateOTPInput = z.infer<typeof ValidateOTPSchema>
export type ValidateOTPOutput = void

export const SendForgotPasswordOTPSchema = z.object({
  email: EmailSchema,
})
export const SendForgotPasswordOTPSchemaOutput = z.object({
  otpId: ID,
})
export type SendForgotPasswordOTPInput = z.infer<typeof SendForgotPasswordOTPSchema>
export type SendForgotPasswordOTPOutput = z.infer<typeof SendForgotPasswordOTPSchemaOutput>

export const SendUpdateEmailOTPSchema = z.object({
  email: EmailSchema,
})
export const SendUpdateEmailOTPSchemaOutput = z.object({
  otpId: ID,
})
export type SendUpdateEmailOTPInput = z.infer<typeof SendUpdateEmailOTPSchema>
export type SendUpdateEmailOTPOutput = z.infer<typeof SendUpdateEmailOTPSchemaOutput>

export const SendUpdatePhoneOTPSchema = z.object({
  channel: z.nativeEnum(OTPPhoneChannelEnum),
  phone: PhoneSchema,
})
export const SendUpdatePhoneOTPSchemaOutput = z.object({
  otpId: ID,
})
export type SendUpdatePhoneOTPInput = z.infer<typeof SendUpdatePhoneOTPSchema>
export type SendUpdatePhoneOTPOutput = z.infer<typeof SendUpdateEmailOTPSchemaOutput>
