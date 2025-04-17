import { Invoice } from '@/schemas'

export type RecurrenceCreatePlanInput = {}
export type RecurrenceCreatePlanOutput = {
  planId: string
}

export type RecurrenceUpdatePlanInput = {}
export type RecurrenceUpdatePlanOutput = void

export type RecurrenceCancelPlanInput = {}
export type RecurrenceCancelPlanOutput = void

export type RecurrenceCreateSubscriptionInput = {}
export type RecurrenceCreateSubscriptionOutput = {
  subscriptionId: string
  invoice: Pick<Invoice, 'externalId' | 'amount' | 'paymentMethod' | 'billingDueDate' | 'status'>
}

export type RecurrenceChangeSubscriptionPaymentMethodInput = {}
export type RecurrenceChangeSubscriptionPaymentMethodOutput = {
  subscriptionId: string
}

export type RecurrenceChangeSubscriptionPlanInput = {}
export type RecurrenceChangeSubscriptionPlanOutput = {
  subscriptionId: string
}

export type RecurrenceCancelSubscriptionInput = {}
export type RecurrenceCancelSubscriptionOutput = {
  subscriptionId: string
}

export type IRecurrenceAdapter = {}

export type IRecurrence = {
  createPlan: (input: RecurrenceCreatePlanInput) => Promise<RecurrenceCreatePlanOutput>
  updatePlan: (input: RecurrenceUpdatePlanInput) => Promise<RecurrenceUpdatePlanOutput>
  cancelPlan: (input: RecurrenceCancelPlanInput) => Promise<RecurrenceCancelPlanOutput>
  createSubscription: (input: RecurrenceCreateSubscriptionInput) => Promise<RecurrenceCreateSubscriptionOutput>
  changeSubscriptionPaymentMethod: (input: RecurrenceChangeSubscriptionPaymentMethodInput) => Promise<RecurrenceChangeSubscriptionPaymentMethodOutput>
  changeSubscriptionPlan: (input: RecurrenceChangeSubscriptionPlanInput) => Promise<RecurrenceChangeSubscriptionPlanOutput>
  cancelSubscription: (input: RecurrenceCancelSubscriptionInput) => Promise<RecurrenceCancelSubscriptionOutput>
}
