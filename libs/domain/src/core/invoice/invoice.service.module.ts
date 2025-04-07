import { Module, forwardRef } from '@nestjs/common'

import { InvoiceRepositoryModule } from '@/adapters/database/invoice'
import { InvoiceService } from './invoice.service'
import { SubscriptionServiceModule } from '../subscription'

@Module({
  imports: [InvoiceRepositoryModule],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceServiceModule {}
