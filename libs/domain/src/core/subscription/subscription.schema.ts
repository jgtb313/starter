import { z, EmailSchema, PhoneSchema, DocumentExplicitSchema, BaseAddressSchema, PaymentCardSchema, PixSchema, BoletoSchema } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'
import { RecurrencePaymentMethodEnum } from '@/ports/recurrence'

export enum SubscriptionStatusEnum {
  'TRIAL' = 'TRIAL',
  'ACTIVE' = 'ACTIVE',
  'OVERDUE' = 'OVERDUE',
  'CANCELED' = 'CANCELED',
}

const SubscriptionId = ID('subscription')

const WorkspaceId = ID('workspace')

const PlanId = ID('plan')

const ExternalId = z.string().min(1)

const Amount = z.number().positive()

const Payer = z.object({
  name: z.string().min(1),
  email: EmailSchema,
  phone: PhoneSchema,
  document: DocumentExplicitSchema,
  address: BaseAddressSchema,
})

const Deadline = z.iso.datetime().transform((value) => new Date(value))

const BillingDueDate = z.iso.datetime().transform((value) => new Date(value))

const CanceledAt = z.iso
  .datetime()
  .nullish()
  .transform((value) => (value ? new Date(value) : null))

const Status = z.enum(SubscriptionStatusEnum).default(SubscriptionStatusEnum.ACTIVE)

export const SubscriptionCreditCardSchema = z
  .object({
    subscriptionId: SubscriptionId,
    workspaceId: WorkspaceId,
    planId: PlanId,
    externalId: ExternalId,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.CREDIT_CARD),
    creditCard: PaymentCardSchema,
    deadline: Deadline,
    billingDueDate: BillingDueDate,
    canceledAt: CanceledAt,
    payer: Payer,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'SubscriptionCreditCard' })
export type SubscriptionCreditCard = z.infer<typeof SubscriptionCreditCardSchema>

export const SubscriptionDebitCardSchema = z
  .object({
    subscriptionId: SubscriptionId,
    workspaceId: WorkspaceId,
    planId: PlanId,
    externalId: ExternalId,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.DEBIT_CARD),
    debitCard: PaymentCardSchema,
    deadline: Deadline,
    billingDueDate: BillingDueDate,
    canceledAt: CanceledAt,
    payer: Payer,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'SubscriptionDebitCard' })
export type SubscriptionDebitCard = z.infer<typeof SubscriptionDebitCardSchema>

export const SubscriptionPixCardSchema = z
  .object({
    subscriptionId: SubscriptionId,
    workspaceId: WorkspaceId,
    planId: PlanId,
    externalId: ExternalId,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.PIX),
    pix: PixSchema,
    deadline: Deadline,
    billingDueDate: BillingDueDate,
    canceledAt: CanceledAt,
    payer: Payer,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'SubscriptionPixCard' })
export type SubscriptionPixCard = z.infer<typeof SubscriptionPixCardSchema>

export const SubscriptionBoletoCardSchema = z
  .object({
    subscriptionId: SubscriptionId,
    workspaceId: WorkspaceId,
    planId: PlanId,
    externalId: ExternalId,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.BOLETO),
    boleto: BoletoSchema,
    deadline: Deadline,
    billingDueDate: BillingDueDate,
    canceledAt: CanceledAt,
    payer: Payer,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'SubscriptionBoletoCard' })
export type SubscriptionBoletoCard = z.infer<typeof SubscriptionBoletoCardSchema>

export const SubscriptionSchema = z.discriminatedUnion('paymentMethod', [SubscriptionCreditCardSchema, SubscriptionDebitCardSchema])
export type Subscription = z.infer<typeof SubscriptionSchema>
export type BaseSubscription = BaseSchema<'subscriptionId' | 'externalId', Subscription>
