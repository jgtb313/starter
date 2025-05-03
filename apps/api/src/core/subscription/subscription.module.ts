import { Module } from '@nestjs/common'
import { UserServiceModule, SubscriptionServiceModule } from '@starter/domain'

import { SubscriptionController } from './subscription.controller'

@Module({
  imports: [UserServiceModule, SubscriptionServiceModule],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
