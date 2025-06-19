import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { uuid } from '@starter/common'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { ISubscriptionRepository } from '@/ports/database/subscription'
import { RecurrenceService } from '@/adapters/recurrence'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { InvoiceService } from '@/core/invoice/invoice.service'
import { PlanService } from '@/core/plan/plan.service'
import { SubscriptionCard, SubscriptionPix, SubscriptionBoleto, SubscriptionStatusEnum } from '@/core/subscription/subscription.schema'

export type SubscriptionWorkspaceReference = WithWorkspaceReference<'subscriptionId'>
export const getSubscriptionWorkspaceReference = createWorkspaceReference('subscriptionId')

type CreateSubscriptionInput =
  | (Pick<SubscriptionCard, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer'> & { cardToken: string })
  | Pick<SubscriptionPix, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer'>
  | Pick<SubscriptionBoleto, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer'>

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY') private readonly subscriptionRepository: ISubscriptionRepository,
    @Inject(forwardRef(() => WorkspaceService)) private readonly workspaceService: WorkspaceService,
    @Inject(forwardRef(() => InvoiceService)) private readonly invoiceService: InvoiceService,
    @Inject(forwardRef(() => PlanService)) private readonly planService: PlanService,

    private readonly recurrenceService: RecurrenceService,
  ) {}

  async getSubscription(reference: SubscriptionWorkspaceReference) {
    const { subscriptionId, workspaceId } = getSubscriptionWorkspaceReference(reference)

    const subscription = await this.subscriptionRepository.findById(subscriptionId)

    if (workspaceId && subscription.state.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return subscription
  }

  async createSubscription({ workspaceId, planId, payer, ...input }: CreateSubscriptionInput) {
    const workspace = await this.workspaceService.getWorkspace(workspaceId)

    const plan = await this.planService.getPlan(planId)

    plan.checkIfIsSignable()

    const { customerId: recurrenceCustomerId } = await this.recurrenceService.createCustmer({ workspaceId, name: payer.name, email: payer.email })

    const subscriptionId = uuid()

    const recurrenceSubscription = await this.recurrenceService.createSubscription({
      referenceId: subscriptionId,
      customerId: recurrenceCustomerId,
      planId: plan.state.externalId,
      payer,
      ...input,
    })

    const subscription = await this.subscriptionRepository.create({
      ...recurrenceSubscription,
      subscriptionId,
      workspaceId: workspace.state.workspaceId,
      planId: plan.state.planId,
      externalId: recurrenceSubscription.subscriptionId,
      payer,
      amount: plan.state.amount,
      paymentMethod: input.paymentMethod,
      deadline: plan.nextBillingDate(new Date()),
      status: SubscriptionStatusEnum.TRIAL,
    })

    const { invoiceId, ...recurrenceInvoice } = recurrenceSubscription.invoice

    await this.invoiceService.createInvoice({
      ...recurrenceSubscription,
      ...recurrenceInvoice,
      workspaceId: workspace.state.workspaceId,
      subscriptionId: subscription.state.subscriptionId,
      externalId: invoiceId,
      paymentMethod: input.paymentMethod,
      description: `Payment for the ${plan.state.name} plan for the month of [Month] [Year].`,
      issuedAt: new Date(),
    })

    await this.workspaceService.updateWorkspace(subscription.state.workspaceId, {
      integrations: {
        recurrenceCustomerId,
      },
    })

    return subscription
  }

  changeSubscriptionPaymentMethod() {
    return
  }

  changeSubscriptionPlan() {
    return
  }

  cancelSubscription() {
    return
  }
}
