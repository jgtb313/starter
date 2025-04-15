import { Subscription, BaseSubscription } from '@/schemas'
import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'

export type SubscriptionWorkspaceReference = WithWorkspaceReference<'subscriptionId'>
export const getSubscriptionWorkspaceReference = createWorkspaceReference('subscriptionId')

export interface ISubscriptionService {
  getSubscription(reference: SubscriptionWorkspaceReference): Promise<Subscription>

  createSubscription(input: BaseSubscription): Promise<Subscription>

  changeSubscriptionPaymentMethod(): Promise<void>

  changeSubscriptionPlan(): Promise<void>

  cancelSubscription(): Promise<void>
}
