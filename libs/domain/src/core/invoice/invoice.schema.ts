import { z, PaymentCardSchema } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'
import { RecurrencePaymentMethodEnum } from '@/ports/recurrence'

export enum InvoiceStatusEnum {
  'PENDING' = 'PENDING',
  'PAID' = 'PAID',
  'OVERDUE' = 'OVERDUE',
  'CANCELED' = 'CANCELED',
}

const InvoiceId = ID('invoice')

const WorkspaceId = ID('workspace')

const SubscriptionId = ID('subscription')

const ExternalId = z.string().min(1)

const Description = z.string().min(1)

const Amount = z.number().min(1)

const IssuedAt = z.coerce.date()

const DueDate = z.coerce.date()

const PaidAt = z.coerce
  .date()
  .nullish()
  .transform((value) => value ?? null)

const CanceledAt = z.coerce
  .date()
  .nullish()
  .transform((value) => value ?? null)

const Status = z.nativeEnum(InvoiceStatusEnum).default(InvoiceStatusEnum.PENDING)

export const InvoiceCreditCardSchema = z.object({
  invoiceId: InvoiceId,
  workspaceId: WorkspaceId,
  subscriptionId: SubscriptionId,
  externalId: ExternalId,
  description: Description,
  amount: Amount,
  paymentMethod: z.literal(RecurrencePaymentMethodEnum.CREDIT_CARD),
  creditCard: PaymentCardSchema,
  dueDate: DueDate,
  issuedAt: IssuedAt,
  canceledAt: CanceledAt,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type InvoiceCreditCard = z.infer<typeof InvoiceCreditCardSchema>

export const InvoiceDebitCardSchema = z.object({
  invoiceId: InvoiceId,
  workspaceId: WorkspaceId,
  subscriptionId: SubscriptionId,
  externalId: ExternalId,
  description: Description,
  amount: Amount,
  paymentMethod: z.literal(RecurrencePaymentMethodEnum.DEBIT_CARD),
  debitCard: PaymentCardSchema,
  dueDate: DueDate,
  issuedAt: IssuedAt,
  canceledAt: CanceledAt,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type InvoiceDebitCard = z.infer<typeof InvoiceDebitCardSchema>

export const InvoiceSchema = z.discriminatedUnion('paymentMethod', [InvoiceCreditCardSchema, InvoiceDebitCardSchema])

export type Invoice = z.infer<typeof InvoiceSchema>
export type BaseInvoice = BaseSchema<'invoiceId', Invoice>
