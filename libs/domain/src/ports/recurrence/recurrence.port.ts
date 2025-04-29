import { PaymentCard, Pix, Boleto } from '@starter/schema'

import { Invoice } from '@/core/invoice/invoice.schema'

export enum RecurrenceIntervalEnum {
  'DAY' = 'DAY',
  'WEEK' = 'WEEK',
  'MONTH' = 'MONTH',
  'YEAR' = 'YEAR',
}

export enum RecurrencePaymentMethodEnum {
  'CREDIT_CARD' = 'CREDIT_CARD',
  'DEBIT_CARD' = 'DEBIT_CARD',
  'PIX' = 'PIX',
  'BOLETO' = 'BOLETO',
}

type CreditCardPayment = {
  paymentMethod: RecurrencePaymentMethodEnum.CREDIT_CARD
  creditCard: PaymentCard
}

type DebitCardPayment = {
  paymentMethod: RecurrencePaymentMethodEnum.DEBIT_CARD
  debitCard: PaymentCard
}

type PixPayment = {
  paymentMethod: RecurrencePaymentMethodEnum.PIX
  pix: Pix
}

type BoletoPayment = {
  paymentMethod: RecurrencePaymentMethodEnum.BOLETO
  boleto: Boleto
}

type RecurrencePaymentMethodInput = CreditCardPayment | DebitCardPayment | PixPayment | BoletoPayment

export type RecurrenceCreatePlanInput = {
  referenceId: string
  name: string
  description?: string
  amount: number
  interval: RecurrenceIntervalEnum
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
} & RecurrencePaymentMethodInput
export type RecurrenceCreateSubscriptionOutput = {
  subscriptionId: string
  invoice: Pick<Invoice, 'externalId' | 'amount' | 'paymentMethod' | 'dueDate' | 'status'>
}

export type RecurrenceChangeSubscriptionPaymentMethodInput = {
  subscriptionId: string
} & RecurrencePaymentMethodInput
export type RecurrenceChangeSubscriptionPaymentMethodOutput = {
  subscriptionId: string
  invoice?: Pick<Invoice, 'externalId' | 'amount' | 'paymentMethod' | 'dueDate' | 'status'>
}

export type RecurrenceChangeSubscriptionPlanInput = {
  subscriptionId: string
  planId: string
}
export type RecurrenceChangeSubscriptionPlanOutput = {
  subscriptionId: string
  invoice?: Pick<Invoice, 'externalId' | 'amount' | 'paymentMethod' | 'dueDate' | 'status'>
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
