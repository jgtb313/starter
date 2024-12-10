import dotenv from 'dotenv'
import { z } from '@starter/schema'
import { DomainEnvSchema } from '@starter/domain'

dotenv.config()

export const EnvSchema = DomainEnvSchema.and(
  z.object({
    SERVER_PORT: z.string().min(1),
    SERVER_AUTHENTICATE_SECRET: z.string().min(1),
  }),
)
export type EnvSchema = z.infer<typeof EnvSchema>

export const env = (value: keyof EnvSchema) => {
  const prop = process.env[value]

  if (prop === undefined) {
    throw Error(`You must set the env var ${value}`)
  }

  return prop
}
