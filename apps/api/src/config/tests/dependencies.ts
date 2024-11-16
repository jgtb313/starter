import { vi, Mock } from 'vitest'

import { IDependencies } from '@/support/types'
import { DatabaseInMemory } from '@/adapters/mongodb-in-memory'
import { EncryptInMemory } from '@/adapters/bcrypt-in-memory'
import { JWTInMemory } from '@/adapters/json-web-token-in-memory'
import { MailInMemory } from '@/adapters/google-mail-in-memory'
import { TwilioSMSInMemory } from '@/adapters/twilio-sms-in-memory'
import { TwilioWhatsappInMemory } from '@/adapters/twilio-whatsapp-in-memory'
import { CacheInMemory } from '@/adapters/redis-in-memory'
import { StorageInMemory } from '@/adapters/aws-s3-in-memory'
import { SocialAuthInMemory } from '@/adapters/social-auth-in-memory'
import { LoggerInMemory } from '@/adapters/pino-es-in-memory'

export type SetupTestDependencies<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R ? Mock<(...args: A) => R> : T[K] extends object ? SetupTestDependencies<T[K]> : T[K]
}

export type ITestDependencies = SetupTestDependencies<IDependencies>

export const TestDependencies = async (): Promise<ITestDependencies> => {
  vi.clearAllMocks()

  vi.stubEnv('STAGE', 'local')

  vi.stubEnv('SERVER_PORT', '4000')
  vi.stubEnv('SERVER_AUTHORIZATION_SECRET', 'fake-secret')
  vi.stubEnv('SERVER_AUTHENTICATE_SECRET', 'fake-secret')
  vi.stubEnv('SERVER_RECOVER_PASSWORD_BASE_URL', 'http://localhost:fake')

  vi.stubEnv('MONGODB_URI', 'mongodb://fake-user:fake-password@localhost:27017/fake-db')

  vi.stubEnv('STATIC_ASSETS_URL', 'static.test.com')

  vi.stubEnv('AWS_S3_REGION', 'us-east-1')
  vi.stubEnv('AWS_S3_ASSETS_BUCKET', 'test-assets')

  vi.stubEnv('GOOGLE_MAIL_USER', 'fake.mail.user@gmail.com')
  vi.stubEnv('GOOGLE_MAIL_PASSWORD', 'fake-password')

  vi.stubEnv('TWILIO_SMS_ACCOUNT_SID', 'fake-sms-account-sid')
  vi.stubEnv('TWILIO_SMS_AUTH_TOKEN', 'fake-sms-auth-token')
  vi.stubEnv('TWILIO_SMS_FROM', '+1234567890')

  vi.stubEnv('TWILIO_WHATSAPP_ACCOUNT_SID', 'fake-whatsapp-account-sid')
  vi.stubEnv('TWILIO_WHATSAPP_AUTH_TOKEN', 'fake-whatsapp-auth-token')
  vi.stubEnv('TWILIO_WHATSAPP_FROM', 'whatsapp:+1234567890')

  vi.stubEnv('REDIS_URL', 'redis://localhost:6379')
  vi.stubEnv('REDIS_PASSWORD', 'fake-redis-password')
  vi.stubEnv('REDIS_DISABLED', 'true')

  vi.stubEnv('LOGGER_URL', 'http://logger.test.com')
  vi.stubEnv('LOGGER_USER', 'fake-logger-user')
  vi.stubEnv('LOGGER_PASSWORD', 'fake-logger-password')
  vi.stubEnv('LOGGER_DISABLED', 'false')

  return {
    Database: {
      createSession: DatabaseInMemory.createSession as Mock,
      ...DatabaseInMemory.Repositories,
    },
    Encrypt: EncryptInMemory,
    JWT: JWTInMemory,
    Mail: MailInMemory,
    SMS: TwilioSMSInMemory,
    Whatsapp: TwilioWhatsappInMemory,
    Cache: CacheInMemory,
    Storage: StorageInMemory,
    SocialAuth: SocialAuthInMemory,
    Logger: LoggerInMemory,
  }
}
