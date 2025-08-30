import { Module } from '@nestjs/common'

import { AWSSNSAdapterModule } from '@/adapters/publisher/aws-sns.adapter.module'
import { AWSSQSAdapterModule } from '@/adapters/publisher/aws-sqs.adapter.module'
import { PublisherService } from '@/adapters/publisher/publisher.service'

@Module({
	imports: [
		AWSSNSAdapterModule,
		AWSSQSAdapterModule,
	],
	providers: [
		PublisherService,
	],
	exports: [
		PublisherService,
	],
})
export class PublisherModule {}
