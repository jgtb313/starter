import 'dotenv/config'

import {
	type IServerlessHoistingApplicationContext,
	type LambdaEvent,
	NestServerlessHoistingFactory,
} from '@starter/nestjs-serverless-hoisting'

import { AppModule } from './app.module'
import { LambdaExampleService } from './lambda-example.service'

let app: IServerlessHoistingApplicationContext | null = null

export const handler = async (event: LambdaEvent) => {
	if (!app) {
		app = await NestServerlessHoistingFactory.create(
			AppModule,
			LambdaExampleService,
		)
	}

	return app.execute(event)
}
