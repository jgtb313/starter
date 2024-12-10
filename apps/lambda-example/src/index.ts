import { createDependencies, DomainEnvSchema } from '@starter/domain'

import { lambdaExample } from './lambda-example.service'

const Dependencies = createDependencies({ env: DomainEnvSchema.parse(process.env) })

export const handler = lambdaExample(Dependencies)
