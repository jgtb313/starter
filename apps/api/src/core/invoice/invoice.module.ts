import { InvoiceServiceModule, UserServiceModule } from '@starter/domain'

import { Module } from '@nestjs/common'

import { InvoiceController } from '@/core/invoice/invoice.controller'

@Module({
	imports: [
		UserServiceModule,
		InvoiceServiceModule,
	],
	controllers: [
		InvoiceController,
	],
})
export class InvoiceModule {}
