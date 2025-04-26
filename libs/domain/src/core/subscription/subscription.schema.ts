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

export const SubscriptionPayerSchema = z.object({
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
    payer: SubscriptionPayerSchema,
    deadline: Deadline,
    billingDueDate: BillingDueDate,
    canceledAt: CanceledAt,
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
    payer: SubscriptionPayerSchema,
    deadline: Deadline,
    billingDueDate: BillingDueDate,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'SubscriptionDebitCard' })
export type SubscriptionDebitCard = z.infer<typeof SubscriptionDebitCardSchema>

export const SubscriptionPixSchema = z
  .object({
    subscriptionId: SubscriptionId,
    workspaceId: WorkspaceId,
    planId: PlanId,
    externalId: ExternalId,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.PIX),
    pix: PixSchema,
    payer: SubscriptionPayerSchema,
    deadline: Deadline,
    billingDueDate: BillingDueDate,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'SubscriptionPix' })
export type SubscriptionPixCard = z.infer<typeof SubscriptionPixSchema>

export const SubscriptionBoletoSchema = z
  .object({
    subscriptionId: SubscriptionId,
    workspaceId: WorkspaceId,
    planId: PlanId,
    externalId: ExternalId,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.BOLETO),
    boleto: BoletoSchema,
    payer: SubscriptionPayerSchema,
    deadline: Deadline,
    billingDueDate: BillingDueDate,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'SubscriptionBoleto' })
export type SubscriptionBoletoCard = z.infer<typeof SubscriptionBoletoSchema>

export const SubscriptionSchema = z.discriminatedUnion('paymentMethod', [
  SubscriptionCreditCardSchema,
  SubscriptionDebitCardSchema,
  SubscriptionPixSchema,
  SubscriptionBoletoSchema,
])
export type Subscription = z.infer<typeof SubscriptionSchema>
export type BaseSubscription = BaseSchema<'subscriptionId' | 'externalId', Subscription>
