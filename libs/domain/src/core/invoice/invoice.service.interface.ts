import { Pagination, PaginationOutput } from '@starter/schema'

import { Invoice, BaseInvoice } from '@/schemas'
import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'

export type InvoiceWorkspaceReference = WithWorkspaceReference<'invoiceId'>
export const getInvoiceWorkspaceReference = createWorkspaceReference('invoiceId')

export interface IInvoiceService {
  getPaginatedInvoices(input: Pagination<Invoice>): Promise<PaginationOutput<Invoice>>

  getInvoice(reference: InvoiceWorkspaceReference): Promise<Invoice>

  createInvoice(input: BaseInvoice): Promise<Invoice>

  updateInvoice(invoiceId: string, input: Partial<Invoice>): Promise<Invoice>
}
