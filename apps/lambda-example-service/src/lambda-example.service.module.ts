import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { LambdaExampleService } from './lambda-example.service'
import { I18nLambdaExampleModule } from './lambda-example.service.i18n.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../../.env',
		}),

		I18nLambdaExampleModule.register(),
	],

	providers: [
		LambdaExampleService,
	],
})
export class LambdaExampleServiceModule {}
