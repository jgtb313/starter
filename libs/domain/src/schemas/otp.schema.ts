import { BaseSchema } from '@/support/schema'
import { NotFoundException } from '@nestjs/common'
import { z, DateSchema } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt } from '@/support/schema'

export enum OTPChannelEnum {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

export enum OTPPhoneChannelEnum {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

export enum OTPContextEnum {
  PASSWORD_LESS = 'PASSWORD_LESS',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  UPDATE_EMAIL = 'UPDATE_EMAIL',
  UPDATE_PHONE = 'UPDATE_PHONE',
}

export const OTPContexts = [
  {
    id: '2nIKjVyfJJvj2kEorugXTQqeret',
    context: OTPContextEnum.PASSWORD_LESS,
    dailyLimitAttempts: 60,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2nIKjVyfJJvj2kEorugXTQbkkqq',
    context: OTPContextEnum.FORGOT_PASSWORD,
    dailyLimitAttempts: 60,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2nIKjVyfJJvj2kEorugXTQbkkgB',
    context: OTPContextEnum.UPDATE_EMAIL,
    dailyLimitAttempts: 60,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2nIKkOP5vlPKbaGHv5E1n0bJiYW',
    context: OTPContextEnum.UPDATE_PHONE,
    dailyLimitAttempts: 60,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const getContext = (type: OTPContextEnum) => {
  const context = OTPContexts.find((otpContext) => otpContext.context === type)

  if (!context) {
    throw new NotFoundException(`OTP Context ${type} not found`)
  }

  return context
}

const OTPId = ID('otp')

const UserId = ID('user')
  .nullish()
  .transform((value) => value ?? null)

const OTPChannelSchema = z.nativeEnum(OTPChannelEnum).openapi({
  example: OTPChannelEnum['EMAIL'],
})

const OTPContextSchema = z.nativeEnum(OTPContextEnum).openapi({
  example: OTPContextEnum['UPDATE_EMAIL'],
})

const Recipient = z.string().min(1)

const Code = z.string().min(1)

const Attempts = z.number().default(0)

const MaxAttempts = z.number().default(0)

const ResendTime = z.number()

const DailyLimitAttempts = z.number()

const ExpiresIn = DateSchema

export const OTPSchema = z.object({
  otpId: OTPId,
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
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type OTP = z.infer<typeof OTPSchema>
export type BaseOTP = BaseSchema<'otpId', OTP>
