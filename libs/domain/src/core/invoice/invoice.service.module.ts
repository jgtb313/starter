import { forwardRef, Module } from '@nestjs/common'

import { InvoiceRepositoryModule } from '@/adapters/database/invoice'
import { InvoiceService } from '@/core/invoice/invoice.service'
import { SubscriptionServiceModule } from '@/core/subscription/subscription.service.module'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'

@Module({
	imports: [
		InvoiceRepositoryModule,
		forwardRef(() => WorkspaceServiceModule),
		forwardRef(() => SubscriptionServiceModule),
	],
	providers: [
		InvoiceService,
	],
	exports: [
		InvoiceService,
	],
})
export class InvoiceServiceModule {}
