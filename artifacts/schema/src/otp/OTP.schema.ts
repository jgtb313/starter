import { z } from '@/zod'

import { ID, DateSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { OTPChannelEnum, OTPContextEnum } from './OTP.enums'

const UserId = ID.nullish().transform((value) => value ?? null)

export const OTPChannelSchema = z.nativeEnum(OTPChannelEnum).openapi({
  example: OTPChannelEnum['EMAIL'],
})

export const OTPContextSchema = z.nativeEnum(OTPContextEnum).openapi({
  example: OTPContextEnum['UPDATE_EMAIL'],
})

const Recipient = z.string().min(1)

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
  userId: UserId,
  channel: OTPChannelSchema,
  context: OTPContextSchema,
  recipient: Recipient,
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
