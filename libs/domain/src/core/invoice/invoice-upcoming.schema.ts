import { BasePaymentCardSchema, z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'
import { PlanSchema } from '@/core/plan/plan.schema'

const InvoiceId = z.string().min(1).meta({
	description:
		'Temporary identifier for an upcoming invoice that has not yet been generated.',
	example: 'draft-9f8a7b6c-1234-4e89-b567-abcdef123456',
})

const WorkspaceId = BaseSchema.id('workspace')

const SubscriptionId = BaseSchema.id('subscription')

const PlanId = BaseSchema.id('plan')

const Plan = PlanSchema

const Amount = z.number().positive()

const DueDate = z.iso.datetime().transform((value) => new Date(value))

const Status = z
	.enum([
		'OPEN',
	])
	.default('OPEN')
export type UpcomingInvoiceStatus = z.infer<typeof Status>

export const UpcomingInvoiceCardSchema = z
	.object({
		invoiceId: InvoiceId,
		workspaceId: WorkspaceId,
		subscriptionId: SubscriptionId,
		planId: PlanId,
		plan: Plan,
		amount: Amount,
		paymentMethod: z.literal('CARD'),
		card: BasePaymentCardSchema,
		dueDate: DueDate,
		status: Status,
	})
	.meta({
		title: 'InvoiceCard',
	})
export type UpcomingInvoiceCard = z.infer<typeof UpcomingInvoiceCardSchema>

export const UpcomingInvoicePixSchema = z
	.object({
		invoiceId: InvoiceId,
		workspaceId: WorkspaceId,
		subscriptionId: SubscriptionId,
		planId: PlanId,
		plan: Plan,
		amount: Amount,
		paymentMethod: z.literal('PIX'),
		dueDate: DueDate,
		status: Status,
	})
	.meta({
		title: 'InvoicePix',
	})
export type UpcomingInvoicePix = z.infer<typeof UpcomingInvoicePixSchema>

export const UpcomingInvoiceBoletoSchema = z
	.object({
		invoiceId: InvoiceId,
		workspaceId: WorkspaceId,
		subscriptionId: SubscriptionId,
		planId: PlanId,
		plan: Plan,
		amount: Amount,
		paymentMethod: z.literal('BOLETO'),
		dueDate: DueDate,
		status: Status,
	})
	.meta({
		title: 'InvoiceBoleto',
	})
export type UpcomingInvoiceBoleto = z.infer<typeof UpcomingInvoiceBoletoSchema>

export const UpcomingInvoiceSchema = z.discriminatedUnion('paymentMethod', [
	UpcomingInvoiceCardSchema,
	UpcomingInvoicePixSchema,
	UpcomingInvoiceBoletoSchema,
])

export type UpcomingInvoice = z.infer<typeof UpcomingInvoiceSchema>
