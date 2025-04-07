import { Injectable, Inject, forwardRef } from '@nestjs/common'

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
    // private readonly workspaceService: WorkspaceService,
    // private readonly planService: PlanService,
    // @Inject(forwardRef(() => InvoiceService)) private readonly invoiceService: InvoiceService,
    // private readonly recurrenceService: RecurrenceService,
  ) {}

  async getSubscription(subscriptionId: string) {
    const subscription = await this.subscriptionRepository.findById(subscriptionId)

    return subscription
  }

  async createSubscription({ workspaceId, planId, ...input }: BaseSubscription) {
    // const workspace = await this.workspaceService.getWorkspace(workspaceId)
    // const plan = await this.planService.getPlan(planId)
    // const { recurrenceId, invoice } = await this.recurrenceService.create({})
    // const subscription = await this.subscriptionRepository.create({
    //   ...input,
    //   workspaceId: workspace.workspaceId,
    //   planId: plan.planId,
    //   externalId: recurrenceId,
    // })
    // await this.invoiceService.createInvoice({
    //   ...invoice,
    //   workspaceId: workspace.workspaceId,
    //   subscriptionId: subscription.subscriptionId,
    //   description: '',
    //   issuedAt: new Date(),
    // })
    // await this.workspaceService.updateWorkspace(subscription.workspaceId, {})
    // return subscription
  }

  changeSubscriptionPaymentMethod() {}

  changeSubscriptionPlan() {}

  cancelSubscription() {}
}
