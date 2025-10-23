import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type Invoice, InvoiceSchema } from '@/core/invoice/invoice.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class InvoiceDomain extends BaseDomain<Invoice> {
	constructor(
		invoice: Invoice,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(InvoiceSchema.parse(invoice))
	}
}
