import { z, CreditCardSchema } from '@starter/schema'

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

const Description = z.string().min(1)

const Amount = z.number().min(1)

const IssuedAt = z.coerce.date()

const BillingDueDate = z.coerce.date()

const CanceledAt = z.coerce
  .date()
  .nullish()
  .transform((value) => value ?? null)

const Status = z.nativeEnum(InvoiceStatusEnum).default(InvoiceStatusEnum.PENDING)

const BaseInvoiceSchema = z.object({
  invoiceId: InvoiceId,
  workspaceId: WorkspaceId,
  subscriptionId: SubscriptionId,
  description: Description,
  amount: Amount,
  issuedAt: IssuedAt,
  billingDueDate: BillingDueDate,
  canceledAt: CanceledAt,
  status: Status,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})

export const InvoiceCreditCardSchema = BaseInvoiceSchema.extend({
  paymentMethod: z.literal(InvoicePaymentMethodEnum.CREDIT_CARD),
  creditCard: CreditCardSchema,
})
export type InvoiceCreditCard = z.infer<typeof InvoiceCreditCardSchema>

export const InvoiceDebitCardSchema = BaseInvoiceSchema.extend({
  paymentMethod: z.literal(InvoicePaymentMethodEnum.DEBIT_CARD),
  debitCard: CreditCardSchema,
})
export type InvoiceDebitCard = z.infer<typeof InvoiceDebitCardSchema>

export const InvoicePixSchema = BaseInvoiceSchema.extend({
  paymentMethod: z.literal(InvoicePaymentMethodEnum.PIX),
  pixQrCode: z.string().min(1),
})
export type InvoicePix = z.infer<typeof InvoicePixSchema>

export const InvoiceBoletoSchema = BaseInvoiceSchema.extend({
  paymentMethod: z.literal(InvoicePaymentMethodEnum.BOLETO),
  boletoURL: z.string().min(1),
  boletoInstructions: z.string().min(1),
  boletoDueDate: z.coerce.date(),
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
