import { CreateDependenciesOptions } from './domain.types'
import { Database } from '@/adapters/mongodb'
import { Encrypt } from '@/adapters/bcrypt'
import { JWT } from '@/adapters/json-web-token'
import { Mail } from '@/adapters/google-mail'
import { SMS } from '@/adapters/twilio-sms'
import { Whatsapp } from '@/adapters/twilio-whatsapp'
import { Cache } from '@/adapters/redis'
import { Storage } from '@/adapters/aws-s3'
import { SocialAuth } from '@/adapters/social-auth'
import { Logger } from '@/adapters/pino-es'

export const createDependencies = (options: CreateDependenciesOptions) => {
  const DatabaseInstance = Database(options)

  return {
    Database: {
      connect: DatabaseInstance.connect,
      disconnect: DatabaseInstance.disconnect,
      createSession: DatabaseInstance.createSession,
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

export type IDependencies = ReturnType<typeof createDependencies>
