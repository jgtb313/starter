import {
	BaseAddressSchema,
	BasePaymentCardSchema,
	DocumentExplicitSchema,
	EmailSchema,
	PhoneSchema,
	z,
} from '@starter/schema'

import type { BaseDomainInput } from '@/support/base-domain'
import { BaseSchema } from '@/support/base-schema'
import { PlanSchema } from '@/core/plan/plan.schema'

const SubscriptionId = BaseSchema.id('subscription')

const WorkspaceId = BaseSchema.id('workspace')

const PlanId = BaseSchema.id('plan')

const Plan = PlanSchema

const ExternalId = z.string().min(1)

export const SubscriptionPayerSchema = z.object({
	name: z.string().min(1),
	email: EmailSchema,
	phone: PhoneSchema,
	document: DocumentExplicitSchema,
	address: BaseAddressSchema,
})

const NextBillingDate = z.iso.datetime().transform((value) => new Date(value))

const Deadline = z.iso.datetime().transform((value) => new Date(value))

const CanceledAt = z.iso
	.datetime()
	.nullish()
	.transform((value) => (value ? new Date(value) : null))

const Status = z
	.enum([
		'TRIAL',
		'ACTIVE',
		'OVERDUE',
		'CANCELED',
	])
	.default('TRIAL')
export type SubscriptionStatus = z.infer<typeof Status>

export const SubscriptionCardSchema = z
	.object({
		subscriptionId: SubscriptionId,
		workspaceId: WorkspaceId,
		planId: PlanId,
		plan: Plan,
		externalId: ExternalId,
		paymentMethod: z.literal('CARD'),
		card: BasePaymentCardSchema,
		payer: SubscriptionPayerSchema,
		nextBillingDate: NextBillingDate,
		deadline: Deadline,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: BaseSchema.createdAt,
		updatedAt: BaseSchema.updatedAt,
	})
	.meta({
		title: 'SubscriptionCard',
	})
export type SubscriptionCard = z.infer<typeof SubscriptionCardSchema>

export const SubscriptionPixSchema = z
	.object({
		subscriptionId: SubscriptionId,
		workspaceId: WorkspaceId,
		planId: PlanId,
		plan: Plan,
		externalId: ExternalId,
		paymentMethod: z.literal('PIX'),
		payer: SubscriptionPayerSchema,
		nextBillingDate: NextBillingDate,
		deadline: Deadline,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: BaseSchema.createdAt,
		updatedAt: BaseSchema.updatedAt,
	})
	.meta({
		title: 'SubscriptionPix',
	})
export type SubscriptionPix = z.infer<typeof SubscriptionPixSchema>

export const SubscriptionBoletoSchema = z
	.object({
		subscriptionId: SubscriptionId,
		workspaceId: WorkspaceId,
		planId: PlanId,
		plan: Plan,
		externalId: ExternalId,
		paymentMethod: z.literal('BOLETO'),
		payer: SubscriptionPayerSchema,
		nextBillingDate: NextBillingDate,
		deadline: Deadline,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: BaseSchema.createdAt,
		updatedAt: BaseSchema.updatedAt,
	})
	.meta({
		title: 'SubscriptionBoleto',
	})
export type SubscriptionBoleto = z.infer<typeof SubscriptionBoletoSchema>

export const SubscriptionSchema = z.discriminatedUnion('paymentMethod', [
	SubscriptionCardSchema,
	SubscriptionPixSchema,
	SubscriptionBoletoSchema,
])

export const SubscriptionInputSchema = z.discriminatedUnion('paymentMethod', [
	SubscriptionCardSchema.partial({
		subscriptionId: true,
	}).omit({
		plan: true,
	}),
	SubscriptionPixSchema.partial({
		subscriptionId: true,
	}).omit({
		plan: true,
	}),
	SubscriptionBoletoSchema.partial({
		subscriptionId: true,
	}).omit({
		plan: true,
	}),
])

export type Subscription = z.infer<typeof SubscriptionSchema>
export type SubscriptionInput = BaseDomainInput<
	z.input<typeof SubscriptionInputSchema>
>
