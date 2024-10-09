import { z } from '@/zod'

import { ID, DateSchema, EmailSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { OTPContextEnum } from './OTP.enums'

export const OTPContextSchema = z.nativeEnum(OTPContextEnum).openapi({
  example: OTPContextEnum['UPDATE_EMAIL'],
})

const Email = EmailSchema

const Code = z.string().min(4).max(4).openapi({
  example: '9051',
})

const Attempts = z.number().default(0)

const MaxAttempts = z.number().default(0)

const ResendTime = z.number()

const DailyLimitAttempts = z.number()

const ExpiresIn = DateSchema

export const OTPSchema = z.object({
  id: ID,
  context: OTPContextSchema,
  email: Email,
  code: Code,
  attempts: Attempts,
  maxAttempts: MaxAttempts,
  resendTime: ResendTime,
  dailyLimitAttempts: DailyLimitAttempts,
  expiresIn: ExpiresIn,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema,
})
export type OTP = z.infer<typeof OTPSchema>
