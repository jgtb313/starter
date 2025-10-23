import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { InvoiceDomain } from '@/core/invoice/invoice.domain'
import type { Invoice, InvoiceInput } from '@/core/invoice/invoice.schema'

type FindInvoiceInput = Partial<Pick<Invoice, 'description' | 'status'>>

type RoleSort = Sort<'description' | 'status' | 'createdAt'>

export type IInvoiceRepository = {
	findPaginated(
		input: Merge<
			[
				FindInvoiceInput,
				RoleSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<InvoiceDomain>>
	find(
		input: Merge<
			[
				FindInvoiceInput,
				RoleSort,
			]
		>,
	): Promise<InvoiceDomain[]>
	findById(invoiceId: string): Promise<InvoiceDomain>
	create(input: InvoiceInput): Promise<InvoiceDomain>
	updateById(
		invoiceId: string,
		input: Partial<InvoiceInput>,
	): Promise<InvoiceDomain>
}
