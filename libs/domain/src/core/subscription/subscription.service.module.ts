import { Module } from '@nestjs/common'

import { SubscriptionRepositoryModule } from '@/adapters/database/subscription'
import { SubscriptionService } from './subscription.service'

@Module({
  imports: [SubscriptionRepositoryModule],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionServiceModule {}
