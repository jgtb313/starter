import {
	BasePaymentCardSchema,
	BoletoSchema,
	PixSchema,
	z,
} from '@starter/schema'

import type { BaseDomainInput } from '@/support/base-domain'
import { BaseSchema } from '@/support/base-schema'
import { PlanSchema } from '@/core/plan/plan.schema'

const InvoiceId = BaseSchema.id('invoice')

const WorkspaceId = BaseSchema.id('workspace')

const SubscriptionId = BaseSchema.id('subscription')

const PlanId = BaseSchema.id('plan')

const Plan = PlanSchema

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
		planId: PlanId,
		plan: Plan,
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
		planId: PlanId,
		plan: Plan,
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
		planId: PlanId,
		plan: Plan,
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
export const InvoiceInputSchema = z.discriminatedUnion('paymentMethod', [
	InvoiceCardSchema.partial({
		invoiceId: true,
		createdAt: true,
		updatedAt: true,
	}).omit({
		plan: true,
	}),
	InvoicePixSchema.partial({
		invoiceId: true,
		createdAt: true,
		updatedAt: true,
	}).omit({
		plan: true,
	}),
	InvoiceBoletoSchema.partial({
		invoiceId: true,
		createdAt: true,
		updatedAt: true,
	}).omit({
		plan: true,
	}),
])
export const UpdatableInvoiceInputSchema = z.discriminatedUnion(
	'paymentMethod',
	[
		InvoiceCardSchema.partial().omit({
			invoiceId: true,
			workspaceId: true,
			subscriptionId: true,
			planId: true,
			plan: true,
		}),
		InvoicePixSchema.partial().omit({
			invoiceId: true,
			workspaceId: true,
			subscriptionId: true,
			planId: true,
			plan: true,
		}),
		InvoiceBoletoSchema.partial().omit({
			invoiceId: true,
			workspaceId: true,
			subscriptionId: true,
			planId: true,
			plan: true,
		}),
	],
)

export type Invoice = z.infer<typeof InvoiceSchema>
export type InvoiceInput = BaseDomainInput<z.input<typeof InvoiceInputSchema>>
export type UpdatableInvoiceInput = BaseDomainInput<
	z.input<typeof UpdatableInvoiceInputSchema>
>
