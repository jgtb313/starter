import { NestServerHoistingFactory } from '@starter/nestjs-server-hoisting'

import { AppModule } from '../src/app.module'

const execute = async () => {
  const app = await NestServerHoistingFactory.create(AppModule)

  await app.close()
}

execute()
