import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { ISubscriptionRepository } from '@/ports/database/subscription'
import { RecurrenceService } from '@/adapters/recurrence'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { InvoiceService } from '@/core/invoice/invoice.service'
import { PlanService } from '@/core/plan/plan.service'
import { getSubscriptionWorkspaceReference, ISubscriptionService } from '@/core/subscription/subscription.service.interface'

@Injectable()
export class SubscriptionService implements ISubscriptionService {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY') private readonly subscriptionRepository: ISubscriptionRepository,
    @Inject(forwardRef(() => WorkspaceService)) private readonly workspaceService: WorkspaceService,
    @Inject(forwardRef(() => InvoiceService)) private readonly invoiceService: InvoiceService,
    @Inject(forwardRef(() => PlanService)) private readonly planService: PlanService,

    private readonly recurrenceService: RecurrenceService,
  ) {}

  getSubscription: ISubscriptionService['getSubscription'] = async (reference) => {
    const { subscriptionId, workspaceId } = getSubscriptionWorkspaceReference(reference)

    const subscription = await this.subscriptionRepository.findById(subscriptionId)

    if (subscription.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return subscription
  }

  createSubscription: ISubscriptionService['createSubscription'] = async ({ workspaceId, planId, ...input }) => {
    const workspace = await this.workspaceService.getWorkspace(workspaceId)

    const plan = await this.planService.getPlan(planId)

    const { recurrenceId, invoice } = await this.recurrenceService.create({})

    const subscription = await this.subscriptionRepository.create({
      ...input,
      workspaceId: workspace.workspaceId,
      planId: plan.planId,
      externalId: recurrenceId,
    })

    await this.invoiceService.createInvoice({
      ...invoice,
      workspaceId: workspace.workspaceId,
      subscriptionId: subscription.subscriptionId,
      description: '',
      issuedAt: new Date(),
    })

    await this.workspaceService.updateWorkspace(subscription.workspaceId, {})

    return subscription
  }

  changeSubscriptionPaymentMethod: ISubscriptionService['changeSubscriptionPaymentMethod'] = async () => {
    return
  }

  changeSubscriptionPlan: ISubscriptionService['changeSubscriptionPlan'] = async () => {
    return
  }

  cancelSubscription: ISubscriptionService['cancelSubscription'] = async () => {
    return
  }
}
