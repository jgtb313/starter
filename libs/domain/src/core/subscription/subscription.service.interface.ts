import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { Subscription, SubscriptionCard, SubscriptionPix, SubscriptionBoleto } from '@/core/subscription/subscription.schema'

export type SubscriptionWorkspaceReference = WithWorkspaceReference<'subscriptionId'>
export const getSubscriptionWorkspaceReference = createWorkspaceReference('subscriptionId')

type CreateSubscriptionInput =
  | (Pick<SubscriptionCard, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer'> & { cardToken: string })
  | Pick<SubscriptionPix, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer'>
  | Pick<SubscriptionBoleto, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer'>

export interface ISubscriptionService {
  getSubscription(reference: SubscriptionWorkspaceReference): Promise<Subscription>

  createSubscription(input: CreateSubscriptionInput): Promise<Subscription>

  changeSubscriptionPaymentMethod(): Promise<void>

  changeSubscriptionPlan(): Promise<void>

  cancelSubscription(): Promise<void>
}
