import type { Pagination, PaginationOutput } from '@starter/schema'

import type { InvoiceDomain } from '@/core/invoice/invoice.domain'
import type { BaseInvoice, Invoice } from '@/core/invoice/invoice.schema'

export type IInvoiceRepository = {
	findAllPaginated(
		input: Pagination<Invoice>,
	): Promise<PaginationOutput<InvoiceDomain>>
	findAll(input: Partial<Invoice>): Promise<InvoiceDomain[]>
	findById(invoiceId: string): Promise<InvoiceDomain>
	create(input: BaseInvoice): Promise<InvoiceDomain>
	updateById(invoiceId: string, input: Partial<Invoice>): Promise<InvoiceDomain>
}
