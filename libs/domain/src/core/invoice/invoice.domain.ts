import { BaseDomain } from '@/support/base-domain'
import { type Invoice, InvoiceSchema } from '@/core/invoice/invoice.schema'

export class InvoiceDomain extends BaseDomain<Invoice> {
	constructor(invoice: Invoice) {
		super(InvoiceSchema, invoice)
	}
}
