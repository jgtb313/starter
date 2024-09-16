require('dotenv').config()

type Env =
  | 'STAGE'
  | 'SERVER_PORT'
  | 'SERVER_SECRET'
  | 'SERVER_RECOVER_PASSWORD_BASE_URL'
  | 'MONGODB_URL'
  | 'GOOGLE_MAIL_USER'
  | 'GOOGLE_MAIL_PASSWORD'
  | 'AWS_S3_REGION'
  | 'AWS_S3_FILE_BUCKET'

export const env = (value: Env) => {
  const prop = process.env[value]

  if (prop === undefined) {
    throw Error(`You must set the env var ${value}`)
  }

  return prop
}
