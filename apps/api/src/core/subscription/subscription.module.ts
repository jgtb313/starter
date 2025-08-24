import { Module } from '@nestjs/common'
import { SubscriptionServiceModule, UserServiceModule } from '@starter/domain'

import { SubscriptionController } from './subscription.controller'

@Module({
	imports: [
		UserServiceModule,
		SubscriptionServiceModule,
	],
	controllers: [
		SubscriptionController,
	],
})
export class SubscriptionModule {}
