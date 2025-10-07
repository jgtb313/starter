import { SQS } from '@aws-sdk/client-sqs'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AWSSQSAdapter } from '@/adapters/publisher/aws-sqs.adapter'

const SQSClientSymbol = Symbol('SQS_CLIENT')

@Module({
	imports: [
		ConfigModule,
	],
	providers: [
		{
			provide: SQSClientSymbol,
			useFactory: (configService: ConfigService) => {
				const region = configService.get<string>('AWS_SQS_REGION')!

				return new SQS({
					region,
				})
			},
			inject: [
				ConfigService,
			],
		},
		{
			provide: AWSSQSAdapter,
			useFactory: (client: SQS) => new AWSSQSAdapter(client),
			inject: [
				SQSClientSymbol,
			],
		},
	],
	exports: [
		AWSSQSAdapter,
	],
})
export class AWSSQSAdapterModule {}
