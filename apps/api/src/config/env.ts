import dotenv from 'dotenv'

dotenv.config()

import { z } from '@starter/schema'

type Env =
  | 'STAGE'
  | 'SERVER_PORT'
  | 'SERVER_AUTHORIZE_SECRET'
  | 'SERVER_REFRESH_AUTHORIZE_SECRET'
  | 'SERVER_AUTHENTICATE_SECRET'
  | 'MONGODB_URI'
  | 'STATIC_ASSETS_URL'
  | 'AWS_S3_REGION'
  | 'AWS_S3_ASSETS_BUCKET'
  | 'GOOGLE_MAIL_USER'
  | 'GOOGLE_MAIL_PASSWORD'
  | 'TWILIO_SMS_ACCOUNT_SID'
  | 'TWILIO_SMS_AUTH_TOKEN'
  | 'TWILIO_SMS_FROM'
  | 'TWILIO_WHATSAPP_ACCOUNT_SID'
  | 'TWILIO_WHATSAPP_AUTH_TOKEN'
  | 'TWILIO_WHATSAPP_FROM'
  | 'REDIS_URL'
  | 'REDIS_PASSWORD'
  | 'REDIS_DISABLED'
  | 'LOGGER_URL'
  | 'LOGGER_USER'
  | 'LOGGER_PASSWORD'
  | 'LOGGER_DISABLED'

export const EnvSchema = z.object({
  STAGE: z.enum(['local', 'development', 'production']),

  // Server
  SERVER_PORT: z.string().transform(Number),
  SERVER_AUTHORIZE_SECRET: z.string().min(1),
  SERVER_REFRESH_AUTHORIZE_SECRET: z.string().min(1),
  SERVER_AUTHENTICATE_SECRET: z.string().min(1),

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

export const env = (value: Env) => {
  const prop = process.env[value]

  if (prop === undefined) {
    throw Error(`You must set the env var ${value}`)
  }

  return prop
}
