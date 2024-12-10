import { createDependencies, EnvSchema } from '@starter/domain'

const env = EnvSchema.parse(process.env)

export const Dependencies = createDependencies({
  env,
})
