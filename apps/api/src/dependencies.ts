import { IDependencies } from '@/core/shared/types'
import { Database } from '@/adapters/mongodb'
import { Encrypt } from '@/adapters/bcrypt'
import { JWT } from '@/adapters/json-web-token'
import { Mail } from '@/adapters/google-mail'
import { SMS } from '@/adapters/twilio-sms'
import { Whatsapp } from '@/adapters/twilio-whatsapp'
import { Storage } from '@/adapters/aws-s3'
import { SocialAuth } from '@/adapters/social-auth'

export const Dependencies: IDependencies = {
  Database: { createSession: Database.createSession, ...Database.Repositories },
  Encrypt,
  JWT,
  Mail,
  SMS,
  Whatsapp: Whatsapp,
  Storage,
  SocialAuth,
}
