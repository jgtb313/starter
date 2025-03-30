import { Pagination, PaginationOutput } from '@starter/schema'

import { Invoice, BaseInvoice } from '@/schemas'

export type IInvoiceRepository = {
  findPaginated(input: Pagination<Invoice>): Promise<PaginationOutput<Invoice>>
  findById(invoiceId: string): Promise<Invoice>
  findOne(input: Partial<Invoice>): Promise<Invoice | null>
  create(input: BaseInvoice): Promise<Invoice>
  updateById(invoiceId: string, input: Partial<Invoice>): Promise<Invoice>
}
