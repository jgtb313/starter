import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { InvoiceDomain } from '@/core/invoice/invoice.domain'
import type {
	Invoice,
	InvoiceInput,
	UpdatableInvoiceInput,
} from '@/core/invoice/invoice.schema'

type FindInvoiceInput = Partial<
	Pick<Invoice, 'description' | 'status' | 'createdAt'>
>

type InvoiceSort = Sort<'description' | 'status' | 'createdAt'>

export type IInvoiceRepository = {
	findPaginated(
		input: Merge<
			[
				FindInvoiceInput,
				InvoiceSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<InvoiceDomain>>
	find(
		input: Merge<
			[
				FindInvoiceInput,
				InvoiceSort,
			]
		>,
	): Promise<InvoiceDomain[]>
	findById(invoiceId: string): Promise<InvoiceDomain>
	create(input: InvoiceInput): Promise<InvoiceDomain>
	updateById(
		invoiceId: string,
		input: UpdatableInvoiceInput,
	): Promise<InvoiceDomain>
}
