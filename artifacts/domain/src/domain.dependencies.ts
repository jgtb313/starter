import type { VitestUtils, Mock } from 'vitest'

import { DomainEnv } from './domain.schema'

import { Database } from './adapters/mongodb'
import { Encrypt } from './adapters/bcrypt'
import { JWT } from './adapters/json-web-token'
import { Mail } from './adapters/google-mail'
import { SMS } from './adapters/twilio-sms'
import { Whatsapp } from './adapters/twilio-whatsapp'
import { Cache } from './adapters/redis'
import { Storage } from './adapters/aws-s3'
import { SocialAuth } from './adapters/social-auth'
import { Logger } from './adapters/pino-es'

import {
  DatabaseInMemory,
  EncryptInMemory,
  JWTInMemory,
  MailInMemory,
  SMSInMemory,
  WhatsappInMemory,
  CacheInMemory,
  StorageInMemory,
  SocialAuthInMemory,
  LoggerInMemory,
} from './ports'

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

export const createDependencies = (options: CreateDependenciesOptions) => {
  const DatabaseInstance = Database(options)

  return {
    Database: {
      ...DatabaseInstance,
      ...DatabaseInstance.Repositories,
    },
    Encrypt: Encrypt(options),
    JWT: JWT(options),
    Mail: Mail(options),
    SMS: SMS(options),
    Whatsapp: Whatsapp(options),
    Cache: Cache(options),
    Storage: Storage(options),
    SocialAuth: SocialAuth(options),
    Logger: Logger(options),
  }
}

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
    SMS: SMSInMemory(options),
    Whatsapp: WhatsappInMemory(options),
    Cache: CacheInMemory(options),
    Storage: StorageInMemory(options),
    SocialAuth: SocialAuthInMemory(options),
    Logger: LoggerInMemory(options),
  }
}

export type IDependencies = ReturnType<typeof createDependencies>
