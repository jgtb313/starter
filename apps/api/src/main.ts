import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { NestServerHoistingFactory } from '@starter/nestjs-server-hoisting'
import { config, StageEnum } from '@starter/config'

import { AppModule } from '@/app.module'

const execute = () => {
  const documentationPath = resolve(process.cwd(), 'docs/Documentation.md')
  const documentation = readFileSync(documentationPath, 'utf-8')

  NestServerHoistingFactory.create(AppModule, {
    port: 4000,

    documentation: {
      title: `${config.name} API`,
      description: documentation,
      favicon: config.logo.darkSymbol,
      server: config.apiUrls[process.env.STAGE as StageEnum],
    },
  })
}

execute()
