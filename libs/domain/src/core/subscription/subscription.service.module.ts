import { Module, forwardRef } from '@nestjs/common'

import { SubscriptionRepositoryModule } from '@/adapters/database/subscription'
import { RecurrenceModule } from '@/adapters/recurrence'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { PlanServiceModule } from '@/core/plan/plan.service.module'
import { InvoiceServiceModule } from '@/core/invoice/invoice.service.module'
import { SubscriptionService } from '@/core/subscription/subscription.service'

@Module({
  imports: [
    SubscriptionRepositoryModule,
    RecurrenceModule,
    forwardRef(() => WorkspaceServiceModule),
    forwardRef(() => PlanServiceModule),
    forwardRef(() => InvoiceServiceModule),
  ],
  providers: [
    {
      provide: 'SUBSCRIPTION_SERVICE',
      useClass: SubscriptionService,
    },
  ],
  exports: ['SUBSCRIPTION_SERVICE'],
})
export class SubscriptionServiceModule {}
