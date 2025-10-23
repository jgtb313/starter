import { forwardRef, Module } from '@nestjs/common'

import { InvoiceService } from '@/core/invoice/invoice.service'
import { PlanServiceModule } from '@/core/plan/plan.service.module'
import { SubscriptionServiceModule } from '@/core/subscription/subscription.service.module'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { InvoiceRepositoryModule } from '@/adapters/database/invoice/invoice.repository.module'
import { RecurrenceModule } from '@/adapters/recurrence/recurrence.module'

@Module({
	imports: [
		InvoiceRepositoryModule,
		forwardRef(() => WorkspaceServiceModule),
		forwardRef(() => SubscriptionServiceModule),
		forwardRef(() => PlanServiceModule),
		RecurrenceModule,
	],
	providers: [
		InvoiceService,
	],
	exports: [
		InvoiceService,
	],
})
export class InvoiceServiceModule {}
