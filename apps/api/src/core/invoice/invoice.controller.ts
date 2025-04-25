import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { InvoiceService, InvoiceSchema, InvoiceStatusEnum } from '@starter/domain'

import { ListInvoicesSchema, ListInvoicesRequest } from '@/core/invoice/invoice.controller.schema'

@Controller({
  name: 'Invoice',

  description: 'Handles operations for managing and retrieving invoices.',

  basePath: 'invoices',

  schemas: {
    Invoice: {
      schema: InvoiceSchema,
    },
  },
})
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Route({
    summary: 'List Invoices',

    description: 'Retrieves a list of invoices.',

    method: 'GET',

    parameters: {
      query: ListInvoicesSchema.query,
    },

    responses: {
      200: {
        schema: ListInvoicesSchema.output,
      },
    },
  })
  async listInvoices(@Request() { query }: ListInvoicesRequest) {
    return this.invoiceService.getPaginatedInvoices({
      ...query,
    })
  }
}
