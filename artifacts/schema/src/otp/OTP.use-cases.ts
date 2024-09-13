import { z } from '@/zod'

import { ID } from '@/common'
import { OTPSchema } from './OTP.schema'

export const SendOTPSchema = OTPSchema.pick({
  context: true,
  email: true
})
export const SendOTPSchemOutput = z.object({
  otp: ID
})
export type SendOTPInput = z.infer<typeof SendOTPSchema>
export type SendOTPOutput = z.infer<typeof SendOTPSchemOutput>

export const ValidateOTPSchema = OTPSchema.pick({
  id: true,
  context: true,
  code: true
})
export type ValidateOTPInput = z.infer<typeof ValidateOTPSchema>
export type ValidateOTPOutput = Promise<void>
