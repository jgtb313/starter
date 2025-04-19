import { Pagination, PaginationOutput } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { Invoice, BaseInvoice } from '@/core/invoice/invoice.schema'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'

export type InvoiceWorkspaceReference = WithWorkspaceReference<'invoiceId'>
export const getInvoiceWorkspaceReference = createWorkspaceReference('invoiceId')

export interface IInvoiceService {
  getPaginatedInvoices(input: Pagination<Invoice>): Promise<PaginationOutput<InvoiceDomain>>

  getInvoice(reference: InvoiceWorkspaceReference): Promise<InvoiceDomain>

  createInvoice(input: BaseInvoice): Promise<InvoiceDomain>

  updateInvoice(invoiceId: string, input: Partial<Invoice>): Promise<InvoiceDomain>
}
