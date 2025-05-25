import { z } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'

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
    otpId: '2nIKjVyfJJvj2kEorugXTQqeret',
    context: OTPContextEnum.PASSWORD_LESS,
    dailyLimitAttempts: 60,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    otpId: '2nIKjVyfJJvj2kEorugXTQbkkqq',
    context: OTPContextEnum.FORGOT_PASSWORD,
    dailyLimitAttempts: 60,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    otpId: '2nIKjVyfJJvj2kEorugXTQbkkgB',
    context: OTPContextEnum.UPDATE_EMAIL,
    dailyLimitAttempts: 60,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    otpId: '2nIKkOP5vlPKbaGHv5E1n0bJiYW',
    context: OTPContextEnum.UPDATE_PHONE,
    dailyLimitAttempts: 60,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const OTPId = ID('otp')

const UserId = ID('user')
  .nullish()
  .transform((value) => value ?? null)

const OTPChannelSchema = z.enum(OTPChannelEnum).meta({
  description: 'Channel through which the OTP is sent',
  example: [OTPChannelEnum.EMAIL],
})

const OTPContextSchema = z.enum(OTPContextEnum).meta({
  description: 'Business context for which the OTP is used',
  example: [OTPContextEnum.UPDATE_EMAIL],
})

const Recipient = z
  .string()
  .min(1)
  .meta({
    description: 'Recipient identifier (email or phone number)',
    example: ['user@example.com', '+15555555555'],
  })

const Code = z
  .string()
  .min(1)
  .meta({
    description: 'One-time password code sent to the user',
    example: ['438210'],
  })

const Attempts = z
  .number()
  .default(0)
  .meta({
    description: 'Number of failed validation attempts',
    example: [0, 1],
  })

const MaxAttempts = z
  .number()
  .default(0)
  .meta({
    description: 'Maximum allowed validation attempts',
    example: [4],
  })

const ResendIntervalSeconds = z.number().meta({
  description: 'Cooldown time in seconds before OTP can be resent',
  example: [60],
})

const DailyLimitAttempts = z.number().meta({
  description: 'Maximum number of OTPs that can be requested per day for a given context and recipient',
  example: [60],
})

const ExpiresAt = z.iso
  .datetime()
  .transform((value) => new Date(value))
  .meta({
    description: 'Exact expiration date and time of the OTP',
    example: [new Date(Date.now() + 1200000).toISOString()],
  })

export const OTPSchema = z.object({
  otpId: OTPId,
  userId: UserId,
  channel: OTPChannelSchema,
  context: OTPContextSchema,
  recipient: Recipient,
  code: Code,
  attempts: Attempts,
  maxAttempts: MaxAttempts,
  resendIntervalSeconds: ResendIntervalSeconds,
  dailyLimitAttempts: DailyLimitAttempts,
  expiresAt: ExpiresAt,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})

export type OTP = z.infer<typeof OTPSchema>
export type OTPInput = z.input<typeof OTPSchema>
export type BaseOTP = BaseSchema<'otpId', OTP>
