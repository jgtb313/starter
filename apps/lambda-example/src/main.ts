import 'dotenv/config'

import { NestServerlessHoistingFactory, LambdaEvent, IServerlessHoistingApplicationContext } from '@starter/nestjs-serverless-hoisting'

import { LambdaExampleService } from './lambda-example.service'
import { AppModule } from './app.module'

let app: IServerlessHoistingApplicationContext | null = null

export const handler = async (event: LambdaEvent) => {
  if (!app) {
    app = await NestServerlessHoistingFactory.create(AppModule, LambdaExampleService)
  }

  await app.execute(event)
}
