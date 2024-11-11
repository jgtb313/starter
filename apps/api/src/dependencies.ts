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

export const Dependencies = {
  Database: { createSession: Database.createSession, ...Database.Repositories },
  Encrypt,
  JWT,
  Mail,
  SMS,
  Whatsapp,
  Cache,
  Storage,
  SocialAuth,
  Logger,
}
