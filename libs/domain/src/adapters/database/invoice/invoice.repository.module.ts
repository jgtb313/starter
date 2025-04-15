import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PaginationModule } from '@/support/pagination'
import { InvoiceTypeorm } from '@/adapters/database/invoice/invoice.typeorm.adapter'
import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity]), PaginationModule],
  providers: [
    {
      provide: 'INVOICE_REPOSITORY',
      useClass: InvoiceTypeorm,
    },
  ],
  exports: ['INVOICE_REPOSITORY'],
})
export class InvoiceRepositoryModule {}
