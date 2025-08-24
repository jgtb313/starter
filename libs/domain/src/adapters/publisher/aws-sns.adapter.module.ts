import { SNS } from '@aws-sdk/client-sns'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AWSSNSAdapter } from '@/adapters/publisher/aws-sns.adapter'

@Module({
	imports: [
		ConfigModule,
	],
	providers: [
		{
			provide: 'SNS_CLIENT',
			useFactory: (configService: ConfigService) => {
				const region = configService.get<string>('AWS_SNS_REGION')!

				return new SNS({
					region,
				})
			},
			inject: [
				ConfigService,
			],
		},
		{
			provide: AWSSNSAdapter,
			useFactory: (client: SNS) => new AWSSNSAdapter(client),
			inject: [
				'SNS_CLIENT',
			],
		},
	],
	exports: [
		AWSSNSAdapter,
	],
})
export class AWSSNSAdapterModule {}
