import { BaseAddress, BasePaymentCard, DocumentExplicit, Phone, BasePix, BaseBoleto } from '@starter/schema'

import { Invoice } from '@/core/invoice/invoice.schema'

export enum RecurrenceIntervalEnum {
  'DAY' = 'DAY',
  'WEEK' = 'WEEK',
  'MONTH' = 'MONTH',
  'YEAR' = 'YEAR',
}

export enum RecurrencePaymentMethodEnum {
  'CARD' = 'CARD',
  'PIX' = 'PIX',
  'BOLETO' = 'BOLETO',
}

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

export type RecurrenceCreateCustomerInput = {
  workspaceId: string
  name: string
  email: string
}
export type RecurrenceCreateCustomerOutput = {
  customerId: string
}

type CardPayment = {
  paymentMethod: RecurrencePaymentMethodEnum.CARD
  cardToken: string
}
type PixPayment = {
  paymentMethod: RecurrencePaymentMethodEnum.PIX
}
type BoletoPayment = {
  paymentMethod: RecurrencePaymentMethodEnum.BOLETO
}
type RecurrencePaymentMethodInput = CardPayment | PixPayment | BoletoPayment

type CardPaymentOutput = {
  paymentMethod: RecurrencePaymentMethodEnum.CARD
  card: BasePaymentCard
}
type PixPaymentOutput = {
  paymentMethod: RecurrencePaymentMethodEnum.PIX
  pix: BasePix
}
type BoletoPaymentOutput = {
  paymentMethod: RecurrencePaymentMethodEnum.BOLETO
  boleto: BaseBoleto
}
type RecurrencePaymentMethodOutput = CardPaymentOutput | PixPaymentOutput | BoletoPaymentOutput

export type RecurrenceCreateSubscriptionInput = {
  referenceId: string
  customerId: string
  planId: string
  payer: {
    name: string
    email: string
    phone: Phone
    document: DocumentExplicit
    address: BaseAddress
  }
} & RecurrencePaymentMethodInput
export type RecurrenceCreateSubscriptionOutput = {
  subscriptionId: string
  invoice: Pick<Invoice, 'invoiceId' | 'amount' | 'paymentMethod' | 'dueDate' | 'status'>
} & RecurrencePaymentMethodOutput

export type RecurrenceChangeSubscriptionPaymentMethodInput = {
  subscriptionId: string
} & RecurrencePaymentMethodInput
export type RecurrenceChangeSubscriptionPaymentMethodOutput = {
  subscriptionId: string
  invoice?: Pick<Invoice, 'invoiceId' | 'amount' | 'paymentMethod' | 'dueDate' | 'status'>
} & RecurrencePaymentMethodOutput

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

  createCustmer: (input: RecurrenceCreateCustomerInput) => Promise<RecurrenceCreateCustomerOutput>

  createSubscription: (input: RecurrenceCreateSubscriptionInput) => Promise<RecurrenceCreateSubscriptionOutput>
  changeSubscriptionPaymentMethod: (input: RecurrenceChangeSubscriptionPaymentMethodInput) => Promise<RecurrenceChangeSubscriptionPaymentMethodOutput>
  changeSubscriptionPlan: (input: RecurrenceChangeSubscriptionPlanInput) => Promise<RecurrenceChangeSubscriptionPlanOutput>
  cancelSubscription: (input: RecurrenceCancelSubscriptionInput) => Promise<RecurrenceCancelSubscriptionOutput>
}

export type IRecurrenceAdapter = IRecurrence
