import {
	BaseAddressSchema,
	BasePaymentCardSchema,
	DocumentExplicitSchema,
	EmailSchema,
	PhoneSchema,
	z,
} from '@starter/schema'

import { type BaseSchema, CreatedAt, ID, UpdatedAt } from '@/support/schema'

import { RecurrencePaymentMethodEnum } from '@/ports/recurrence'

export enum SubscriptionStatusEnum {
	TRIAL = 'TRIAL',
	ACTIVE = 'ACTIVE',
	OVERDUE = 'OVERDUE',
	CANCELED = 'CANCELED',
}

const SubscriptionId = ID('subscription')

const WorkspaceId = ID('workspace')

const PlanId = ID('plan')

const ExternalId = z.string().min(1)

const Amount = z.number().positive()

export const SubscriptionPayerSchema = z.object({
	name: z.string().min(1),
	email: EmailSchema,
	phone: PhoneSchema,
	document: DocumentExplicitSchema,
	address: BaseAddressSchema,
})

const Deadline = z.iso.datetime().transform((value) => new Date(value))

const CanceledAt = z.iso
	.datetime()
	.nullish()
	.transform((value) => (value ? new Date(value) : null))

const Status = z
	.enum(SubscriptionStatusEnum)
	.default(SubscriptionStatusEnum.ACTIVE)

export const SubscriptionCardSchema = z
	.object({
		subscriptionId: SubscriptionId,
		workspaceId: WorkspaceId,
		planId: PlanId,
		externalId: ExternalId,
		amount: Amount,
		paymentMethod: z.literal(RecurrencePaymentMethodEnum.CARD),
		card: BasePaymentCardSchema,
		payer: SubscriptionPayerSchema,
		deadline: Deadline,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: CreatedAt,
		updatedAt: UpdatedAt,
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
		externalId: ExternalId,
		amount: Amount,
		paymentMethod: z.literal(RecurrencePaymentMethodEnum.PIX),
		payer: SubscriptionPayerSchema,
		deadline: Deadline,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: CreatedAt,
		updatedAt: UpdatedAt,
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
		externalId: ExternalId,
		amount: Amount,
		paymentMethod: z.literal(RecurrencePaymentMethodEnum.BOLETO),
		payer: SubscriptionPayerSchema,
		deadline: Deadline,
		canceledAt: CanceledAt,
		status: Status,
		createdAt: CreatedAt,
		updatedAt: UpdatedAt,
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
export type Subscription = z.infer<typeof SubscriptionSchema>
export type SubscriptionInput = z.input<typeof SubscriptionSchema>
export type BaseSubscription = BaseSchema<
	'subscriptionId' | 'externalId',
	Subscription
>
