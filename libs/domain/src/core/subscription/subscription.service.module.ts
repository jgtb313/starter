import { forwardRef, Module } from '@nestjs/common'

import { InvoiceServiceModule } from '@/core/invoice/invoice.service.module'
import { PlanServiceModule } from '@/core/plan/plan.service.module'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { SubscriptionRepositoryModule } from '@/adapters/database/subscription/subscription.repository.module'
import { RecurrenceModule } from '@/adapters/recurrence'

@Module({
	imports: [
		SubscriptionRepositoryModule,
		RecurrenceModule,
		forwardRef(() => WorkspaceServiceModule),
		forwardRef(() => PlanServiceModule),
		forwardRef(() => InvoiceServiceModule),
	],
	providers: [
		SubscriptionService,
	],
	exports: [
		SubscriptionService,
	],
})
export class SubscriptionServiceModule {}
