import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { InvoiceDomain } from '@/core/invoice/invoice.domain'
import type { BaseInvoice, Invoice } from '@/core/invoice/invoice.schema'

type FindInvoiceInput = Partial<Pick<Invoice, 'description' | 'status'>>

type RoleSort = Sort<'description' | 'status' | 'createdAt'>

export type IInvoiceRepository = {
	findAllPaginated(
		input: Merge<
			[
				FindInvoiceInput,
				RoleSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<InvoiceDomain>>
	findAll(
		input: Merge<
			[
				FindInvoiceInput,
				RoleSort,
			]
		>,
	): Promise<InvoiceDomain[]>
	findById(invoiceId: string): Promise<InvoiceDomain>
	create(input: BaseInvoice): Promise<InvoiceDomain>
	updateById(invoiceId: string, input: Partial<Invoice>): Promise<InvoiceDomain>
}
