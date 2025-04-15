import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { IInvoiceRepository } from '@/ports/database/invoice'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { getInvoiceWorkspaceReference, IInvoiceService } from '@/core/invoice/invoice.service.interface'

@Injectable()
export class InvoiceService implements IInvoiceService {
  constructor(
    @Inject('INVOICE_REPOSITORY') private readonly invoiceRepository: IInvoiceRepository,
    @Inject(forwardRef(() => WorkspaceService)) private readonly workspaceService: WorkspaceService,
    @Inject(forwardRef(() => SubscriptionService)) private readonly subscriptionService: SubscriptionService,
  ) {}

  getPaginatedInvoices: IInvoiceService['getPaginatedInvoices'] = async (input) => {
    return this.invoiceRepository.findAllPaginated({
      ...input,
    })
  }

  getInvoice: IInvoiceService['getInvoice'] = async (reference) => {
    const { invoiceId, workspaceId } = getInvoiceWorkspaceReference(reference)

    const invoice = await this.invoiceRepository.findById(invoiceId)

    if (workspaceId && invoice.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return invoice
  }

  createInvoice: IInvoiceService['createInvoice'] = async ({ workspaceId, subscriptionId, ...input }) => {
    const workspace = await this.workspaceService.getWorkspace(workspaceId)

    const subscription = await this.subscriptionService.getSubscription(subscriptionId)

    return this.invoiceRepository.create({
      ...input,
      workspaceId: workspace.workspaceId,
      subscriptionId: subscription.subscriptionId,
    })
  }

  updateInvoice: IInvoiceService['updateInvoice'] = async (invoiceId, input) => {
    const invoice = await this.invoiceRepository.findById(invoiceId)

    return this.invoiceRepository.updateById(invoice.invoiceId, input)
  }
}
