import { vi, Mock } from 'vitest'

import { IDependencies } from '@/core/shared/types'
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
  vi.stubEnv('STAGE', 'local')

  vi.stubEnv('SERVER_PORT', '4000')
  vi.stubEnv('SERVER_SECRET', 'fake-secret')
  vi.stubEnv('SERVER_LOCAL_POSTBACK_TARGET', 'fake-target')
  vi.stubEnv('SERVER_POSTBACK_SECRET', 'fake-postback-secret')
  vi.stubEnv('SERVER_PROCESS_POSTBACK', 'false')
  vi.stubEnv('SERVER_START_SCHEDULE', 'false')
  vi.stubEnv('SERVER_RECOVER_PASSWORD_BASE_URL', 'http://localhost:fake')

  vi.stubEnv('MONGODB_URL', 'mongodb://fake-user:fake-password@localhost:27017/fake-db')
  vi.stubEnv('STATIC_IMAGE_URL', 'static.test.com.br')

  vi.stubEnv('AWS_S3_REGION', 'us-east-1')
  vi.stubEnv('AWS_S3_FILE_BUCKET', 'test-assets')

  vi.stubEnv('GOOGLE_MAIL_USER', 'fake.mail.user@gmail.com')
  vi.stubEnv('GOOGLE_MAIL_PASSWORD', 'fake-password')

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
    },

    Repositories: DatabaseInMemory.Repositories,
  }
}
