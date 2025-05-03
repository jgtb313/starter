import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import {
  Subscription,
  SubscriptionCreditCard,
  SubscriptionDebitCard,
  SubscriptionPix,
  SubscriptionBoleto,
} from '@/core/subscription/subscription.schema'

export type SubscriptionWorkspaceReference = WithWorkspaceReference<'subscriptionId'>
export const getSubscriptionWorkspaceReference = createWorkspaceReference('subscriptionId')

type CreateSubscriptionInput =
  | Pick<SubscriptionCreditCard, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer' | 'creditCard'>
  | Pick<SubscriptionDebitCard, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer' | 'debitCard'>
  | Pick<SubscriptionPix, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer' | 'pix'>
  | Pick<SubscriptionBoleto, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer' | 'boleto'>

export interface ISubscriptionService {
  getSubscription(reference: SubscriptionWorkspaceReference): Promise<Subscription>

  createSubscription(input: CreateSubscriptionInput): Promise<Subscription>

  changeSubscriptionPaymentMethod(): Promise<void>

  changeSubscriptionPlan(): Promise<void>

  cancelSubscription(): Promise<void>
}
