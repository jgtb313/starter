import { Module } from '@nestjs/common'
import { SubscriptionServiceModule } from '@starter/domain'

import { SubscriptionController } from './subscription.controller'

@Module({
  imports: [SubscriptionServiceModule],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
