import type { Mock, VitestUtils } from 'vitest'
import { z } from '@starter/schema'

import { IDependencies } from './domain.support'

export const DomainEnvSchema = z.object({
  STAGE: z.enum(['local', 'development', 'production']),

  // MongoDB Database
  MONGODB_URI: z.string().min(1),

  // Static Image
  STATIC_ASSETS_URL: z.string().min(1),

  // AWS S3
  AWS_S3_REGION: z.string().min(1),
  AWS_S3_ASSETS_BUCKET: z.string().min(1),

  // Google Mail
  GOOGLE_MAIL_USER: z.string().email(),
  GOOGLE_MAIL_PASSWORD: z.string().min(1),

  // Twilio SMS
  TWILIO_SMS_ACCOUNT_SID: z.string().min(1),
  TWILIO_SMS_AUTH_TOKEN: z.string().min(1),
  TWILIO_SMS_FROM: z.string().min(1),

  // Twilio Whatsapp
  TWILIO_WHATSAPP_ACCOUNT_SID: z.string().min(1),
  TWILIO_WHATSAPP_AUTH_TOKEN: z.string().min(1),
  TWILIO_WHATSAPP_FROM: z.string().min(1),

  // Redis
  REDIS_URL: z.string().min(1),
  REDIS_PASSWORD: z.string().min(1),
  REDIS_DISABLED: z.string().min(1),

  // Logger
  LOGGER_URL: z.string().min(1),
  LOGGER_USER: z.string().min(1),
  LOGGER_PASSWORD: z.string().min(1),
  LOGGER_DISABLED: z.string().min(1),
})
export type DomainEnv = z.infer<typeof DomainEnvSchema>

export type SetupTestDependencies<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R ? Mock<(...args: A) => R> : T[K] extends object ? SetupTestDependencies<T[K]> : T[K]
}

export type ITestDependencies = SetupTestDependencies<IDependencies>

export type CreateDependenciesOptions = {
  env: DomainEnv
}

export type CreateTestDependenciesOptions = {
  vi: VitestUtils
  env: DomainEnv
}
