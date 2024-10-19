import { vi, Mock } from 'vitest'

import { IDependencies } from '@/support/types'
import { DatabaseInMemory } from '@/adapters/mongodb-in-memory'
import { JWTInMemory } from '@/adapters/json-web-token-in-memory'
import { EncryptInMemory } from '@/adapters/bcrypt-in-memory'
import { SocialAuthInMemory } from '@/adapters/social-auth-in-memory'
import { StorageInMemory } from '@/adapters/aws-s3-in-memory'
import { MailInMemory } from '@/adapters/google-mail-in-memory'
import { TwilioSMSInMemory } from '@/adapters/twilio-sms-in-memory'
import { TwilioWhatsappInMemory } from '@/adapters/twilio-whatsapp-in-memory'

export type SetupTestDependencies<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R ? Mock<(...args: A) => R> : T[K] extends object ? SetupTestDependencies<T[K]> : T[K]
}

export type ITestDependencies = SetupTestDependencies<IDependencies>

export const TestDependencies = async (): Promise<ITestDependencies> => {
  vi.clearAllMocks()

  vi.stubEnv('PROJECT', 'test')
  vi.stubEnv('PROJECT_DOMAIN', 'test.com')
  vi.stubEnv('STAGE', 'local')

  vi.stubEnv('SERVER_PORT', '4000')
  vi.stubEnv('SERVER_SECRET', 'fake-secret')
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

  return {
    JWT: JWTInMemory,

    Encrypt: EncryptInMemory,

    Mail: MailInMemory,

    SMS: TwilioSMSInMemory,

    Whatsapp: TwilioWhatsappInMemory,

    SocialAuth: SocialAuthInMemory,

    Storage: StorageInMemory,

    Database: {
      createSession: DatabaseInMemory.createSession as Mock,
      ...DatabaseInMemory.Repositories,
    },
  }
}
