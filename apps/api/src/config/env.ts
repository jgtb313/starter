require('dotenv').config()

import { z } from '@starter/schema'

type Env =
  | 'PROJECT'
  | 'STAGE'
  | 'SERVER_PORT'
  | 'SERVER_SECRET'
  | 'SERVER_RECOVER_PASSWORD_BASE_URL'
  | 'MONGODB_URL'
  | 'STATIC_IMAGE_URL'
  | 'AWS_S3_REGION'
  | 'AWS_S3_FILE_BUCKET'
  | 'GOOGLE_MAIL_USER'
  | 'GOOGLE_MAIL_PASSWORD'
  | 'TWILIO_SMS_ACCOUNT_SID'
  | 'TWILIO_SMS_AUTH_TOKEN'
  | 'TWILIO_SMS_FROM'
  | 'TWILIO_WHATSAPP_ACCOUNT_SID'
  | 'TWILIO_WHATSAPP_AUTH_TOKEN'
  | 'TWILIO_WHATSAPP_FROM'

export const EnvSchema = z.object({
  PROJECT: z.string().min(1),
  STAGE: z.enum(['local', 'development', 'production']),

  // Server
  SERVER_PORT: z.string().transform(Number),
  SERVER_SECRET: z.string().min(1),
  SERVER_LOCAL_POSTBACK_TARGET: z.string().min(1),
  SERVER_POSTBACK_SECRET: z.string().min(1),
  SERVER_PROCESS_POSTBACK: z.enum(['true', 'false']).transform((value) => value === 'true'),
  SERVER_START_SCHEDULE: z.enum(['true', 'false']).transform((value) => value === 'true'),
  SERVER_RECOVER_PASSWORD_BASE_URL: z.string(),

  // MongoDB Database
  MONGODB_URL: z.string().min(1),

  // Static Image
  STATIC_IMAGE_URL: z.string().min(1),

  // AWS S3
  AWS_S3_REGION: z.string().min(1),
  AWS_S3_FILE_BUCKET: z.string().min(1),

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
})

export const env = (value: Env) => {
  const prop = process.env[value]

  if (prop === undefined) {
    throw Error(`You must set the env var ${value}`)
  }

  return prop
}
