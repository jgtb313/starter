import { Pagination, PaginationOutput } from '@starter/schema'

import { Invoice, BaseInvoice } from '@/core/invoice/invoice.schema'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'

export type IInvoiceRepository = {
  findAllPaginated(input: Pagination<Invoice>): Promise<PaginationOutput<InvoiceDomain>>
  findAll(input: Partial<Invoice>): Promise<InvoiceDomain[]>
  findById(invoiceId: string): Promise<InvoiceDomain>
  findOne(input: Partial<Invoice>): Promise<InvoiceDomain | null>
  create(input: BaseInvoice): Promise<InvoiceDomain>
  updateById(invoiceId: string, input: Partial<Invoice>): Promise<InvoiceDomain>
}
