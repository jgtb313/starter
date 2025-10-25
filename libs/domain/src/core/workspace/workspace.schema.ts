import { isNil } from '@starter/common'
import {
	BusinessAddressSchema,
	DocumentExplicitSchema,
	EmailSchema,
	LocaleSchema,
	PhoneSchema,
	z,
} from '@starter/schema'

import type { BaseDomainInput } from '@/support/base-domain'
import { BaseSchema } from '@/support/base-schema'
import { PlanSchema } from '@/core/plan/plan.schema'
import { SubscriptionSchema } from '@/core/subscription/subscription.schema'

const WorkspaceId = BaseSchema.id('workspace')

const PlanId = BaseSchema.id('plan')

const Plan = PlanSchema

const SubscriptionId = BaseSchema.id('subscription')
	.nullish()
	.transform((value) => value ?? null)

const Subscription = SubscriptionSchema.nullish().transform(
	(value) => value ?? null,
)

const RecurrenceExternalId = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Name = z.string().min(1)

const Email = EmailSchema.nullish().transform((value) => value ?? null)

const Phone = PhoneSchema.nullish().transform((value) => value ?? null)

const Document = DocumentExplicitSchema.nullish().transform(
	(value) => value ?? null,
)

export const WorskapceAddressSchema = BusinessAddressSchema
const Address = WorskapceAddressSchema.nullish().transform(
	(value) => value ?? null,
)

const Logo = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Domain = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Locale = z
	.object({
		defaultLocale: LocaleSchema,
		availableLocales: z.array(LocaleSchema).default([]),
	})
	.nullish()
	.refine(
		(value) => {
			if (isNil(value)) {
				return true
			}

			return value.availableLocales.includes(value.defaultLocale)
		},
		{
			params: {
				code: 'workspaceInvalidDefaultLocale',
			},
			path: [
				'defaultLocale',
			],
		},
	)
	.transform((value) => value ?? null)

const TrialEndsAt = z.iso
	.datetime()
	.nullish()
	.transform((value) => value ?? null)

const Status = z
	.enum([
		'TRIAL',
		'ACTIVE',
		'INACTIVE',
	])
	.default('TRIAL')
export type WorkspaceStatus = z.infer<typeof Status>

export const WorkspaceSchema = z.object({
	workspaceId: WorkspaceId,
	planId: PlanId,
	plan: Plan,
	subscriptionId: SubscriptionId,
	subscription: Subscription,
	recurrenceExternalId: RecurrenceExternalId,
	name: Name,
	email: Email,
	phone: Phone,
	document: Document,
	address: Address,
	logo: Logo,
	domain: Domain,
	locale: Locale,
	trialEndsAt: TrialEndsAt,
	status: Status,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

export const WorkspaceInputSchema = WorkspaceSchema.partial({
	workspaceId: true,
	createdAt: true,
	updatedAt: true,
}).omit({
	plan: true,
	subscription: true,
})

export const UpdatableWorkspaceInputSchema = WorkspaceSchema.partial().omit({
	workspaceId: true,
	planId: true,
	plan: true,
	subscriptionId: true,
	subscription: true,
	address: true,
})

export type Workspace = z.infer<typeof WorkspaceSchema>
export type WorkspaceInput = BaseDomainInput<
	z.infer<typeof WorkspaceInputSchema>
>
export type UpdatableWorkspaceInput = BaseDomainInput<
	z.infer<typeof UpdatableWorkspaceInputSchema>
>
