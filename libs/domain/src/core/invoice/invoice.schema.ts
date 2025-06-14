import { z, BasePaymentCardSchema, PixSchema, BoletoSchema } from '@starter/schema'

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

const Amount = z.number().positive()

const DueDate = z.iso.datetime().transform((value) => new Date(value))

const IssuedAt = z.iso.datetime().transform((value) => new Date(value))

const PaidAt = z.iso
  .datetime()
  .nullish()
  .transform((value) => (value ? new Date(value) : null))

const OverdueAt = z.iso
  .datetime()
  .nullish()
  .transform((value) => (value ? new Date(value) : null))

const CanceledAt = z.iso
  .datetime()
  .nullish()
  .transform((value) => (value ? new Date(value) : null))

const Status = z.enum(InvoiceStatusEnum).default(InvoiceStatusEnum.PENDING)

export const InvoiceCardSchema = z
  .object({
    invoiceId: InvoiceId,
    workspaceId: WorkspaceId,
    subscriptionId: SubscriptionId,
    externalId: ExternalId,
    description: Description,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.CARD),
    card: BasePaymentCardSchema,
    dueDate: DueDate,
    issuedAt: IssuedAt,
    paidAt: PaidAt,
    overdueAt: OverdueAt,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'InvoiceCard' })
export type InvoiceCard = z.infer<typeof InvoiceCardSchema>

export const InvoicePixSchema = z
  .object({
    invoiceId: InvoiceId,
    workspaceId: WorkspaceId,
    subscriptionId: SubscriptionId,
    externalId: ExternalId,
    description: Description,
    amount: Amount,
    paymentMethod: z.literal(RecurrencePaymentMethodEnum.PIX),
    pix: PixSchema,
    dueDate: DueDate,
    issuedAt: IssuedAt,
    paidAt: PaidAt,
    overdueAt: OverdueAt,
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
    boleto: BoletoSchema,
    dueDate: DueDate,
    issuedAt: IssuedAt,
    paidAt: PaidAt,
    overdueAt: OverdueAt,
    canceledAt: CanceledAt,
    status: Status,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  })
  .meta({ title: 'InvoiceBoleto' })
export type InvoiceBoleto = z.infer<typeof InvoiceBoletoSchema>

export const InvoiceSchema = z.discriminatedUnion('paymentMethod', [InvoiceCardSchema, InvoicePixSchema, InvoiceBoletoSchema])

export type Invoice = z.infer<typeof InvoiceSchema>
export type InvoiceInput = z.input<typeof InvoiceSchema>
export type BaseInvoice = BaseSchema<'invoiceId', Invoice>
