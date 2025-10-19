import { Module } from '@nestjs/common'

import { InvoicePrisma } from '@/adapters/database/invoice/invoice.prisma.adapter'

@Module({
	providers: [
		{
			provide: 'INVOICE_REPOSITORY',
			useClass: InvoicePrisma,
		},
	],
	exports: [
		'INVOICE_REPOSITORY',
	],
})
export class InvoiceRepositoryModule {}
