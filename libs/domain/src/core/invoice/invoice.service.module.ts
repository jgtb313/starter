import { Module, forwardRef } from '@nestjs/common'

import { InvoiceRepositoryModule } from '@/adapters/database/invoice'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { SubscriptionServiceModule } from '@/core/subscription/subscription.service.module'
import { InvoiceService } from '@/core/invoice/invoice.service'

@Module({
  imports: [InvoiceRepositoryModule, forwardRef(() => WorkspaceServiceModule), forwardRef(() => SubscriptionServiceModule)],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceServiceModule {}
