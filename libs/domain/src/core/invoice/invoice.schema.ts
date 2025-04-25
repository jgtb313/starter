import { z, BasePaymentCardSchema } from '@starter/schema'

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

const DueDate = z.iso.datetime().transform((value) => new Date(value))

const IssuedAt = z.iso.datetime().transform((value) => new Date(value))

const PaidAt = z.iso
  .datetime()
  .nullish()
  .transform((value) => (value ? new Date(value) : null))

const CanceledAt = z.iso
  .datetime()
  .nullish()
  .transform((value) => (value ? new Date(value) : null))

const Status = z.enum(InvoiceStatusEnum).default(InvoiceStatusEnum.PENDING)

export const InvoiceCreditCardSchema = z
  .object({
    invoiceId: InvoiceId,
    workspaceId: WorkspaceId,
    subscriptionId: SubscriptionId,
    externalId: ExternalId,
    description: Description,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.CREDIT_CARD),
    creditCard: BasePaymentCardSchema,
    dueDate: DueDate,
    issuedAt: IssuedAt,
    paidAt: PaidAt,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'InvoiceCreditCard' })
export type InvoiceCreditCard = z.infer<typeof InvoiceCreditCardSchema>

export const InvoiceDebitCardSchema = z
  .object({
    invoiceId: InvoiceId,
    workspaceId: WorkspaceId,
    subscriptionId: SubscriptionId,
    externalId: ExternalId,
    description: Description,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.DEBIT_CARD),
    debitCard: BasePaymentCardSchema,
    dueDate: DueDate,
    issuedAt: IssuedAt,
    paidAt: PaidAt,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'InvoiceDebitCard' })
export type InvoiceDebitCard = z.infer<typeof InvoiceDebitCardSchema>

export const InvoicePixSchema = z
  .object({
    invoiceId: InvoiceId,
    workspaceId: WorkspaceId,
    subscriptionId: SubscriptionId,
    externalId: ExternalId,
    description: Description,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.PIX),
    pix: BasePaymentCardSchema,
    dueDate: DueDate,
    issuedAt: IssuedAt,
    paidAt: PaidAt,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'InvoicePix' })
export type InvoicePix = z.infer<typeof InvoicePixSchema>

export const InvoiceBoletoSchema = z
  .object({
    invoiceId: InvoiceId,
    workspaceId: WorkspaceId,
    subscriptionId: SubscriptionId,
    externalId: ExternalId,
    description: Description,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.BOLETO),
    boleto: BasePaymentCardSchema,
    dueDate: DueDate,
    issuedAt: IssuedAt,
    paidAt: PaidAt,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'InvoiceBoleto' })
export type InvoiceBoleto = z.infer<typeof InvoiceBoletoSchema>

export const InvoiceSchema = z.discriminatedUnion('paymentMethod', [
  InvoiceCreditCardSchema,
  InvoiceDebitCardSchema,
  InvoicePixSchema,
  InvoiceBoletoSchema,
])

export type Invoice = z.infer<typeof InvoiceSchema>
export type BaseInvoice = BaseSchema<'invoiceId', Invoice>
