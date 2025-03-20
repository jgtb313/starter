import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { NestServerHoistingFactory } from '@starter/nestjs-server-hoisting'

import { AppModule } from '../src/app.module'

const execute = async () => {
  const app = await NestServerHoistingFactory.create(AppModule)

  const openapiSpec = app.openapiSpec

  const outputPath = join(__dirname, '../../..', 'openapi-spec.json')

  writeFileSync(outputPath, JSON.stringify(openapiSpec, null, 2))

  await app.close()
}

execute()
