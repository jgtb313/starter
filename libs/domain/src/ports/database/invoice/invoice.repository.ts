import { Pagination, PaginationOutput } from '@starter/schema'

import { Invoice, BaseInvoice } from '@/schemas'

export type IInvoiceRepository = {
  findAll(query: Pagination<Invoice>): Promise<PaginationOutput<Invoice>>
  findById(userId: string): Promise<Invoice>
  findOne(input: Partial<Invoice>): Promise<Invoice | null>
  create(input: BaseInvoice): Promise<Invoice>
  updateById(userId: string, input: Partial<Invoice>): Promise<Invoice>
  deleteById(userId: string): Promise<void>
}
