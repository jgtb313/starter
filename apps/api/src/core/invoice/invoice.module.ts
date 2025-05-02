import { Module } from '@nestjs/common'
import { UserServiceModule, InvoiceServiceModule } from '@starter/domain'

import { InvoiceController } from '@/core/invoice/invoice.controller'

@Module({
  imports: [UserServiceModule, InvoiceServiceModule],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
