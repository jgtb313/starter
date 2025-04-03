import { Injectable, Inject } from '@nestjs/common'

import { Subscription, BaseSubscription } from '@/schemas'
import { ISubscriptionRepository } from '@/ports/database/subscription'
import { RecurrenceService } from '@/adapters/recurrence'
import { WorkspaceService } from '../workspace'
import { PlanService } from '../plan'
import { InvoiceService } from '../invoice'

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY') private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly workspaceService: WorkspaceService,
    private readonly planService: PlanService,
    private readonly invoiceService: InvoiceService,
    private readonly recurrenceService: RecurrenceService,
  ) {}

  async getSubscription(subscriptionId: string) {
    const subscription = await this.subscriptionRepository.findById(subscriptionId)

    return subscription
  }

  async createSubscription({ workspaceId, planId, ...input }: BaseSubscription) {
    const workspace = await this.workspaceService.getWorkspace(workspaceId)

    const plan = await this.planService.getPlan(planId)

    const { recurrenceId } = await this.recurrenceService.create()

    const subscription = await this.subscriptionRepository.create({
      ...input,
      workspaceId: workspace.workspaceId,
      planId: plan.planId,
      externalId: recurrenceId,
    })

    const invoice = await this.invoiceService.createInvoice({
      workspaceId: workspace.workspaceId,
      subscriptionId: subscription.subscriptionId,
      externalId: '',
    })

    await this.workspaceService.updateById(subscription.workspaceId, {})

    return subscription
  }

  changeSubscriptionPaymentMethod() {}

  changeSubscriptionPlan() {}

  cancelSubscription() {}
}
