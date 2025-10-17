import { BaseDomain } from '@/support/base-domain'
import {
	type Invoice,
	type InvoiceInput,
	InvoiceSchema,
} from '@/core/invoice/invoice.schema'

export class InvoiceDomain extends BaseDomain<Invoice, InvoiceInput> {
	constructor(invoice: InvoiceInput) {
		super(InvoiceSchema, invoice)
	}
}
