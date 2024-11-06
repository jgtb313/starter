import client from '@ss/client'
import { RequestReturnType, RequestOptions } from '@ss/components'

export type InvoiceState = {
  invoices?: RequestReturnType<typeof client.invoice.list>
  loadingInvoices: boolean
  loadingBatchInvoice: boolean
  loadingDeleteInvoice: boolean

  fetchInvoices: RequestOptions<typeof client.invoice.list>
  batchInvoices: RequestOptions<typeof client.invoice.batch>
  deleteInvoice: RequestOptions<typeof client.invoice.destroy>
}
