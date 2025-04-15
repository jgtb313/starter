import { Injectable, Inject } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { IInvoiceRepository } from '@/ports/database/invoice'
import { IWorkspaceService } from '@/core/workspace/workspace.service.interface'
import { ISubscriptionService } from '@/core/subscription/subscription.service.interface'
import { getInvoiceWorkspaceReference, IInvoiceService } from '@/core/invoice/invoice.service.interface'

@Injectable()
export class InvoiceService implements IInvoiceService {
  constructor(
    @Inject('INVOICE_REPOSITORY') private readonly invoiceRepository: IInvoiceRepository,
    @Inject('WORKSPACE_SERVICE') private readonly workspaceService: IWorkspaceService,
    @Inject('SUBSCRIPTION_SERVICE') private readonly subscriptionService: ISubscriptionService,
  ) {}

  getPaginatedInvoices: IInvoiceService['getPaginatedInvoices'] = async (input) => {
    const result = await this.invoiceRepository.findAllPaginated(input)

    return result
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

    const invoice = await this.invoiceRepository.create({
      ...input,
      workspaceId: workspace.workspaceId,
      subscriptionId: subscription.subscriptionId,
    })

    return invoice
  }

  updateInvoice: IInvoiceService['updateInvoice'] = async (invoiceId, input) => {
    const invoice = await this.invoiceRepository.findById(invoiceId)

    const result = await this.invoiceRepository.updateById(invoice.invoiceId, input)

    return result
  }
}
