import dotenv from 'dotenv'
// import { Env } from '@starter/domain'

dotenv.config()

// export const env = (value: keyof Env) => {
export const env = (value: string) => {
  const prop = process.env[value]

  if (prop === undefined) {
    throw Error(`You must set the env var ${value}`)
  }

  return prop
}
