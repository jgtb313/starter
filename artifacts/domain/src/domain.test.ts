import type { VitestUtils } from 'vitest'

import { DomainEnv, CreateTestDependenciesOptions, ITestDependencies } from './domain.types'
import { DatabaseInMemory } from './adapters/mongodb-in-memory'
import { EncryptInMemory } from './adapters/bcrypt-in-memory'
import { JWTInMemory } from './adapters/json-web-token-in-memory'
import { MailInMemory } from './adapters/google-mail-in-memory'
import { TwilioSMSInMemory } from './adapters/twilio-sms-in-memory'
import { TwilioWhatsappInMemory } from './adapters/twilio-whatsapp-in-memory'
import { CacheInMemory } from './adapters/redis-in-memory'
import { StorageInMemory } from './adapters/aws-s3-in-memory'
import { SocialAuthInMemory } from './adapters/social-auth-in-memory'
import { LoggerInMemory } from './adapters/pino-es-in-memory'

export const createTestDependencies = (vi: VitestUtils): ITestDependencies => {
  vi.clearAllMocks()

  const env: DomainEnv = {
    STAGE: 'development',

    // MongoDB Database
    MONGODB_URI: 'mongodb://localhost:27017/fake_database',

    // Static Image
    STATIC_ASSETS_URL: 'https://fake-static-assets.com',

    // AWS S3
    AWS_S3_REGION: 'us-east-1',
    AWS_S3_ASSETS_BUCKET: 'fake-assets-bucket',

    // Google Mail
    GOOGLE_MAIL_USER: 'fakeuser@gmail.com',
    GOOGLE_MAIL_PASSWORD: 'fakepassword',

    // Twilio SMS
    TWILIO_SMS_ACCOUNT_SID: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    TWILIO_SMS_AUTH_TOKEN: 'fakeauthtoken',
    TWILIO_SMS_FROM: '+1234567890',

    // Twilio Whatsapp
    TWILIO_WHATSAPP_ACCOUNT_SID: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    TWILIO_WHATSAPP_AUTH_TOKEN: 'fakeauthtoken',
    TWILIO_WHATSAPP_FROM: 'whatsapp:+1234567890',

    // Redis
    REDIS_URL: 'redis://localhost:6379',
    REDIS_PASSWORD: 'fakeredispassword',
    REDIS_DISABLED: 'false',

    // Logger
    LOGGER_URL: 'https://fake-logger-service.com',
    LOGGER_USER: 'fakeuser',
    LOGGER_PASSWORD: 'fakepassword',
    LOGGER_DISABLED: 'false',
  }

  const options: CreateTestDependenciesOptions = {
    vi,
    env,
  }

  const DatabaseInMemoryInstance = DatabaseInMemory(options)

  return {
    Database: {
      ...DatabaseInMemoryInstance,
      ...DatabaseInMemoryInstance.Repositories,
    },
    Encrypt: EncryptInMemory(options),
    JWT: JWTInMemory(options),
    Mail: MailInMemory(options),
    SMS: TwilioSMSInMemory(options),
    Whatsapp: TwilioWhatsappInMemory(options),
    Cache: CacheInMemory(options),
    Storage: StorageInMemory(options),
    SocialAuth: SocialAuthInMemory(options),
    Logger: LoggerInMemory(options),
  }
}
