import { Module } from '@nestjs/common'
import { InvoiceServiceModule } from '@starter/domain'

import { InvoiceController } from './invoice.controller'

@Module({
  imports: [InvoiceServiceModule],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
