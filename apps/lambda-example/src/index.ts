import { createDependencies, DomainEnvSchema } from '@starter/domain'

import { service } from './lambda-example.service'

const Dependencies = createDependencies({ env: DomainEnvSchema.parse(process.env) })

export const handler = service(Dependencies)
