import { UseGuards } from '@nestjs/common'
import { Controller, Route, Request } from '@starter/nestjs-server-hoisting'
import { InvoiceService, InvoiceSchema, User } from '@starter/domain'

import { AuthGuard } from '@/support/guards'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import { ListInvoicesSchema, GetInvoiceSchema, ListInvoicesRequest, GetInvoiceRequest } from '@/core/invoice/invoice.controller.schema'

@Controller({
  name: 'Invoice',

  description: 'Handles operations for managing and retrieving invoices.',

  basePath: '/workspaces/:workspaceId/invoices',

  schemas: {
    Invoice: {
      schema: InvoiceSchema,
    },
  },
})
@UseGuards(AuthGuard)
export class InvoiceController {
  constructor(
    private readonly aclService: ACLService,
    private readonly invoiceService: InvoiceService,
  ) {}

  @Route({
    summary: 'List Invoices',

    description: 'Retrieves a list of invoices.',

    method: 'GET',

    parameters: {
      params: ListInvoicesSchema.params,
      query: ListInvoicesSchema.query,
    },

    responses: {
      200: {
        schema: ListInvoicesSchema.output,
      },
    },
  })
  async listInvoices(@AuthenticatedUser() user: User, @Request() { params, query, pagination }: ListInvoicesRequest) {
    this.aclService.canPerformActionByPermission(user, 'invoice:read', {
      workspaceId: params.workspaceId,
    })

    return this.invoiceService.getPaginatedInvoices({
      ...query,
      ...pagination,
      workspaceId: params.workspaceId,
    })
  }

  @Route({
    summary: 'Get Invoice',

    description: 'Retrieves a single invoice by their ID.',

    method: 'GET',

    path: '/:invoiceId',

    parameters: {
      params: GetInvoiceSchema.params,
    },

    responses: {
      200: {
        schema: GetInvoiceSchema.output,
      },
    },
  })
  getInvoice(@AuthenticatedUser() user: User, @Request() { params }: GetInvoiceRequest) {
    this.aclService.canPerformActionByPermission(user, 'invoice:read', {
      workspaceId: params.workspaceId,
    })

    return this.invoiceService.getInvoice(params)
  }
}
