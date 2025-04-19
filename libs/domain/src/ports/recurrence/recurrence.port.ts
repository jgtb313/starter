import { PaymentCard } from '@starter/schema'

import { PlanIntervalEnum } from '@/core/plan/plan.schema'
import { Subscription, SubscriptionPaymentMethodEnum } from '@/core/subscription/subscription.schema'
import { Invoice } from '@/core/invoice/invoice.schema'

export type RecurrenceCreatePlanInput = {
  referenceId: string
  name: string
  description?: string
  amount: number
  interval: PlanIntervalEnum
  intervalCount: number
  trialDays?: number
}
export type RecurrenceCreatePlanOutput = {
  planId: string
}

export type RecurrenceUpdatePlanInput = {
  planId: string
  name?: string
  description?: string
  amount?: number
  interval?: PlanIntervalEnum
  intervalCount?: number
  trialDays?: number
}
export type RecurrenceUpdatePlanOutput = void

export type RecurrenceCancelPlanInput = {
  planId: string
}
export type RecurrenceCancelPlanOutput = void

export type RecurrenceCreateSubscriptionInput = {
  referenceId: string
  customerId: string
  planId: string
  paymentMethod: Subscription['paymentMethod']
  payer: Subscription['payer']
  creditCard?: PaymentCard
  debitCard?: PaymentCard
}
export type RecurrenceCreateSubscriptionOutput = {
  subscriptionId: string
  invoice: Pick<Invoice, 'externalId' | 'amount' | 'paymentMethod' | 'billingDueDate' | 'status'>
}

export type RecurrenceChangeSubscriptionPaymentMethodInput = {
  subscriptionId: string
  paymentMethod: SubscriptionPaymentMethodEnum
  creditCard?: PaymentCard
  debitCard?: PaymentCard
}
export type RecurrenceChangeSubscriptionPaymentMethodOutput = {
  subscriptionId: string
  invoice?: Pick<Invoice, 'externalId' | 'amount' | 'paymentMethod' | 'billingDueDate' | 'status'>
}

export type RecurrenceChangeSubscriptionPlanInput = {
  subscriptionId: string
  planId: string
}
export type RecurrenceChangeSubscriptionPlanOutput = {
  subscriptionId: string
  invoice?: Pick<Invoice, 'externalId' | 'amount' | 'paymentMethod' | 'billingDueDate' | 'status'>
}

export type RecurrenceCancelSubscriptionInput = {
  subscriptionId: string
}
export type RecurrenceCancelSubscriptionOutput = void

export type IRecurrence = {
  createPlan: (input: RecurrenceCreatePlanInput) => Promise<RecurrenceCreatePlanOutput>
  updatePlan: (input: RecurrenceUpdatePlanInput) => Promise<RecurrenceUpdatePlanOutput>
  cancelPlan: (input: RecurrenceCancelPlanInput) => Promise<RecurrenceCancelPlanOutput>

  createSubscription: (input: RecurrenceCreateSubscriptionInput) => Promise<RecurrenceCreateSubscriptionOutput>
  changeSubscriptionPaymentMethod: (input: RecurrenceChangeSubscriptionPaymentMethodInput) => Promise<RecurrenceChangeSubscriptionPaymentMethodOutput>
  changeSubscriptionPlan: (input: RecurrenceChangeSubscriptionPlanInput) => Promise<RecurrenceChangeSubscriptionPlanOutput>
  cancelSubscription: (input: RecurrenceCancelSubscriptionInput) => Promise<RecurrenceCancelSubscriptionOutput>
}

export type IRecurrenceAdapter = IRecurrence
