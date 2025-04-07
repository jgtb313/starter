import { Module } from '@nestjs/common'

import { SubscriptionRepositoryModule } from '@/adapters/database/subscription'
import { RecurrenceModule } from '@/adapters/recurrence'
import { SubscriptionService } from './subscription.service'
import { WorkspaceServiceModule } from '../workspace'
import { PlanServiceModule } from '../plan'
import { InvoiceServiceModule } from '../invoice'

@Module({
  imports: [SubscriptionRepositoryModule, WorkspaceServiceModule, PlanServiceModule, InvoiceServiceModule, RecurrenceModule],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionServiceModule {}
