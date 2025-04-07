import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { Invoice, BaseInvoice } from '@/schemas'
import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { IInvoiceRepository } from '@/ports/database/invoice'
import { WorkspaceService } from '../workspace'
import { SubscriptionService } from '../subscription'

type InvoiceWorkspaceReference = WithWorkspaceReference<'invoiceId'>
const getInvoiceWorkspaceReference = createWorkspaceReference('invoiceId')

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('INVOICE_REPOSITORY') private readonly invoiceRepository: IInvoiceRepository,
    // private readonly workspaceService: WorkspaceService,
    // @Inject(forwardRef(() => SubscriptionService)) private readonly subscriptionService: SubscriptionService,
  ) {}

  async getPaginatedInvoices(input: Pagination<Invoice>) {
    const result = await this.invoiceRepository.findAllPaginated(input)

    return result
  }

  async getInvoice(reference: InvoiceWorkspaceReference) {
    const { invoiceId, workspaceId } = getInvoiceWorkspaceReference(reference)

    const invoice = await this.invoiceRepository.findById(invoiceId)

    if (workspaceId && invoice.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return invoice
  }

  async createInvoice({ workspaceId, subscriptionId, ...input }: BaseInvoice) {
    // const workspace = await this.workspaceService.getWorkspace(workspaceId)
    // const subscription = await this.subscriptionService.getSubscription(subscriptionId)
    // const invoice = await this.invoiceRepository.create({
    //   ...input,
    //   workspaceId: workspace.workspaceId,
    //   subscriptionId: subscription.subscriptionId,
    // })
    // return invoice
  }

  async updateInvoice(invoiceId: string, input: Partial<Invoice>) {
    const invoice = await this.invoiceRepository.findById(invoiceId)

    const result = await this.invoiceRepository.updateById(invoice.invoiceId, input)

    return result
  }
}
