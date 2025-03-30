import { z, PaymentCardSchema, BoletoSchema, PixSchema } from '@starter/schema'

import { ID, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'

export enum InvoicePaymentMethodEnum {
  'CREDIT_CARD' = 'CREDIT_CARD',
  'DEBIT_CARD' = 'DEBIT_CARD',
  'PIX' = 'PIX',
  'BOLETO' = 'BOLETO',
}

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

const BillingDueDate = z.coerce.date()

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
  paymentMethod: z.literal(InvoicePaymentMethodEnum.CREDIT_CARD),
  creditCard: PaymentCardSchema,
  issuedAt: IssuedAt,
  billingDueDate: BillingDueDate,
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
  paymentMethod: z.literal(InvoicePaymentMethodEnum.DEBIT_CARD),
  debitCard: PaymentCardSchema,
  issuedAt: IssuedAt,
  billingDueDate: BillingDueDate,
  canceledAt: CanceledAt,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type InvoiceDebitCard = z.infer<typeof InvoiceDebitCardSchema>

export const InvoicePixSchema = z.object({
  invoiceId: InvoiceId,
  workspaceId: WorkspaceId,
  subscriptionId: SubscriptionId,
  externalId: ExternalId,
  description: Description,
  amount: Amount,
  paymentMethod: z.literal(InvoicePaymentMethodEnum.PIX),
  pix: PixSchema,
  issuedAt: IssuedAt,
  billingDueDate: BillingDueDate,
  canceledAt: CanceledAt,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type InvoicePix = z.infer<typeof InvoicePixSchema>

export const InvoiceBoletoSchema = z.object({
  invoiceId: InvoiceId,
  workspaceId: WorkspaceId,
  subscriptionId: SubscriptionId,
  externalId: ExternalId,
  description: Description,
  amount: Amount,
  paymentMethod: z.literal(InvoicePaymentMethodEnum.BOLETO),
  boleto: BoletoSchema,
  issuedAt: IssuedAt,
  billingDueDate: BillingDueDate,
  canceledAt: CanceledAt,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type InvoiceBoleto = z.infer<typeof InvoiceBoletoSchema>

export const InvoiceSchema = z.discriminatedUnion('paymentMethod', [
  InvoiceCreditCardSchema,
  InvoiceDebitCardSchema,
  InvoicePixSchema,
  InvoiceBoletoSchema,
])

export type Invoice = z.infer<typeof InvoiceSchema>
export type BaseInvoice = BaseSchema<'invoiceId', Invoice>
