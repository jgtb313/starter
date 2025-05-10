import { PaymentCard } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { Subscription, SubscriptionCard } from '@/core/subscription/subscription.schema'

export type SubscriptionWorkspaceReference = WithWorkspaceReference<'subscriptionId'>
export const getSubscriptionWorkspaceReference = createWorkspaceReference('subscriptionId')

type CreateSubscriptionInput = Pick<SubscriptionCard, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer'> & { card: PaymentCard }

export interface ISubscriptionService {
  getSubscription(reference: SubscriptionWorkspaceReference): Promise<Subscription>

  createSubscription(input: CreateSubscriptionInput): Promise<Subscription>

  changeSubscriptionPaymentMethod(): Promise<void>

  changeSubscriptionPlan(): Promise<void>

  cancelSubscription(): Promise<void>
}
