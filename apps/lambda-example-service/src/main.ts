import 'dotenv/config'

import {
	type IServerlessHoistingApplicationContext,
	type LambdaEvent,
	NestServerlessHoistingFactory,
} from '@starter/nestjs-serverless-hoisting'

import { LambdaExampleService } from './lambda-example.service'
import { LambdaExampleServiceModule } from './lambda-example.service.module'

let app: IServerlessHoistingApplicationContext | null = null

export const handler = async (event: LambdaEvent) => {
	if (!app) {
		app = await NestServerlessHoistingFactory.create(
			LambdaExampleServiceModule,
			LambdaExampleService,
		)
	}

	return app.execute(event)
}
