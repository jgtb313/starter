import { Module, forwardRef } from '@nestjs/common'

import { InvoiceRepositoryModule } from '@/adapters/database/invoice'
import { InvoiceService } from './invoice.service'
import { WorkspaceServiceModule } from '../workspace'
import { SubscriptionServiceModule } from '../subscription'

@Module({
  imports: [InvoiceRepositoryModule, forwardRef(() => WorkspaceServiceModule), forwardRef(() => SubscriptionServiceModule)],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceServiceModule {}
