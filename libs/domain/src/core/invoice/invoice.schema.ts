import {
	BasePaymentCardSchema,
	BoletoSchema,
	PixSchema,
	z,
} from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const InvoiceId = BaseSchema.id('invoice')

const WorkspaceId = BaseSchema.id('workspace')

const SubscriptionId = BaseSchema.id('subscription')

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

const Status = z
	.enum([
		'PENDING',
		'PAID',
		'OVERDUE',
		'CANCELED',
	])
	.default('PENDING')
export type InvoiceStatus = z.infer<typeof Status>

export const InvoiceCardSchema = z
	.object({
		invoiceId: InvoiceId,
		workspaceId: WorkspaceId,
		subscriptionId: SubscriptionId,
		externalId: ExternalId,
		description: Description,
		amount: Amount,
		paymentMethod: z.literal('CARD'),
		card: BasePaymentCardSchema,
		dueDate: DueDate,
		issuedAt: IssuedAt,
		paidAt: PaidAt,
		overdueAt: OverdueAt,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: BaseSchema.createdAt,
		updatedAt: BaseSchema.updatedAt,
	})
	.meta({
		title: 'InvoiceCard',
	})
export type InvoiceCard = z.infer<typeof InvoiceCardSchema>

export const InvoicePixSchema = z
	.object({
		invoiceId: InvoiceId,
		workspaceId: WorkspaceId,
		subscriptionId: SubscriptionId,
		externalId: ExternalId,
		description: Description,
		amount: Amount,
		paymentMethod: z.literal('PIX'),
		pix: PixSchema,
		dueDate: DueDate,
		issuedAt: IssuedAt,
		paidAt: PaidAt,
		overdueAt: OverdueAt,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: BaseSchema.createdAt,
		updatedAt: BaseSchema.updatedAt,
	})
	.meta({
		title: 'InvoicePix',
	})
export type InvoicePix = z.infer<typeof InvoicePixSchema>

export const InvoiceBoletoSchema = z
	.object({
		invoiceId: InvoiceId,
		workspaceId: WorkspaceId,
		subscriptionId: SubscriptionId,
		externalId: ExternalId,
		description: Description,
		amount: Amount,
		paymentMethod: z.literal('BOLETO'),
		boleto: BoletoSchema,
		dueDate: DueDate,
		issuedAt: IssuedAt,
		paidAt: PaidAt,
		overdueAt: OverdueAt,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: BaseSchema.createdAt,
		updatedAt: BaseSchema.updatedAt,
	})
	.meta({
		title: 'InvoiceBoleto',
	})
export type InvoiceBoleto = z.infer<typeof InvoiceBoletoSchema>

export const InvoiceSchema = z.discriminatedUnion('paymentMethod', [
	InvoiceCardSchema,
	InvoicePixSchema,
	InvoiceBoletoSchema,
])

export type Invoice = z.infer<typeof InvoiceSchema>
export type InvoiceInput = z.input<typeof InvoiceSchema>
export type BaseInvoice = BaseSchema<
	Invoice,
	{
		optional: [
			'invoiceId',
		]
	}
>
