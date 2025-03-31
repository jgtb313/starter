import { z, EmailSchema, PhoneSchema, DocumentExplicitSchema, BaseAddressSchema, PaymentCardSchema } from '@starter/schema'
import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'

export enum SubscriptionPaymentMethodEnum {
  'CREDIT_CARD' = 'CREDIT_CARD',
  'DEBIT_CARD' = 'DEBIT_CARD',
}

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

const Amount = z.number().min(1)

const Payer = z.object({
  name: z.string().min(1),
  email: EmailSchema,
  phone: PhoneSchema,
  document: DocumentExplicitSchema,
  address: BaseAddressSchema,
})

const Deadline = z.coerce.date()

const BillingDueDate = z.coerce.date()

const CanceledAt = z.coerce
  .date()
  .nullish()
  .transform((value) => value ?? null)

const Status = z.nativeEnum(SubscriptionStatusEnum).default(SubscriptionStatusEnum.ACTIVE)

export const SubscriptionCreditCardSchema = z.object({
  subscriptionId: SubscriptionId,
  workspaceId: WorkspaceId,
  planId: PlanId,
  externalId: ExternalId,
  amount: Amount,
  paymentMethod: z.literal(SubscriptionPaymentMethodEnum.CREDIT_CARD),
  creditCard: PaymentCardSchema,
  deadline: Deadline,
  billingDueDate: BillingDueDate,
  canceledAt: CanceledAt,
  payer: Payer,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type SubscriptionCreditCard = z.infer<typeof SubscriptionCreditCardSchema>

export const SubscriptionDebitCardSchema = z.object({
  subscriptionId: SubscriptionId,
  workspaceId: WorkspaceId,
  planId: PlanId,
  externalId: ExternalId,
  amount: Amount,
  paymentMethod: z.literal(SubscriptionPaymentMethodEnum.DEBIT_CARD),
  debitCard: PaymentCardSchema,
  deadline: Deadline,
  billingDueDate: BillingDueDate,
  canceledAt: CanceledAt,
  payer: Payer,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type SubscriptionDebitCard = z.infer<typeof SubscriptionDebitCardSchema>

export const SubscriptionSchema = z.discriminatedUnion('paymentMethod', [SubscriptionCreditCardSchema, SubscriptionDebitCardSchema])
export type Subscription = z.infer<typeof SubscriptionSchema>
export type BaseSubscription = BaseSchema<'subscriptionId', Subscription>
