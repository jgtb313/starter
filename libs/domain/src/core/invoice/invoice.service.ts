import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { IInvoiceRepository } from '@/ports/database/invoice'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { Invoice, BaseInvoice } from '@/core/invoice/invoice.schema'

export type InvoiceWorkspaceReference = WithWorkspaceReference<'invoiceId'>
export const getInvoiceWorkspaceReference = createWorkspaceReference('invoiceId')

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('INVOICE_REPOSITORY') private readonly invoiceRepository: IInvoiceRepository,
    @Inject(forwardRef(() => WorkspaceService)) private readonly workspaceService: WorkspaceService,
    @Inject(forwardRef(() => SubscriptionService)) private readonly subscriptionService: SubscriptionService,
  ) {}

  async getPaginatedInvoices(input: Pagination<Invoice>) {
    return this.invoiceRepository.findAllPaginated({
      ...input,
    })
  }

  async getInvoice(reference: InvoiceWorkspaceReference) {
    const { invoiceId, workspaceId } = getInvoiceWorkspaceReference(reference)

    const invoice = await this.invoiceRepository.findById(invoiceId)

    if (workspaceId && invoice.state.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return invoice
  }

  async createInvoice({ workspaceId, subscriptionId, ...input }: BaseInvoice) {
    const workspace = await this.workspaceService.getWorkspace(workspaceId)

    const subscription = await this.subscriptionService.getSubscription(subscriptionId)

    return this.invoiceRepository.create({
      ...input,
      workspaceId: workspace.workspaceId,
      subscriptionId: subscription.subscriptionId,
    })
  }

  async updateInvoice(reference: InvoiceWorkspaceReference, input: Partial<Invoice>) {
    const invoice = await this.getInvoice(reference)

    return this.invoiceRepository.updateById(invoice.state.invoiceId, input)
  }
}
