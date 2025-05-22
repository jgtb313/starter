import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { InvoiceTypeorm } from '@/adapters/database/invoice/invoice.typeorm.adapter'
import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
  providers: [
    {
      provide: 'INVOICE_REPOSITORY',
      useClass: InvoiceTypeorm,
    },
  ],
  exports: ['INVOICE_REPOSITORY'],
})
export class InvoiceRepositoryModule {}
