import { Module } from '@nestjs/common'

import { InvoiceRepositoryModule } from '@/adapters/database/invoice'
import { InvoiceService } from './invoice.service'

@Module({
  imports: [InvoiceRepositoryModule],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceServiceModule {}
