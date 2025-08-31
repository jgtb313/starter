import { z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const PlanId = BaseSchema.id('plan')

const ExternalId = z.string().min(1)

const Name = z.string().min(1)

const Description = z.string().min(1)

const Amount = z.number().positive()

const Interval = z.enum([
	'DAY',
	'WEEK',
	'MONTH',
	'YEAR',
])

const IntervalCount = z.number().default(1)

const TrialDays = z.number().default(7)

const BaseFeature = z.object({
	description: z.string().min(1),
})

const OrganizationCountFeature = BaseFeature.extend({
	code: z.literal('ORGANIZATION_COUNT'),
	props: z.object({
		maxOrganizations: z.number().positive().default(1),
	}),
})

export const PlanFeaturesSchema = z
	.array(
		z.discriminatedUnion('code', [
			OrganizationCountFeature,
		]),
	)
	.default([])

const Highlight = z.boolean().default(false)

const Status = z
	.enum([
		'ACTIVE',
		'INACTIVE',
	])
	.default('ACTIVE')

export const PlanSchema = z.object({
	planId: PlanId,
	externalId: ExternalId,
	name: Name,
	description: Description,
	amount: Amount,
	interval: Interval,
	intervalCount: IntervalCount,
	trialDays: TrialDays,
	features: PlanFeaturesSchema,
	highlight: Highlight,
	status: Status,
	deletedAt: BaseSchema.deletedAt,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})
export type Plan = z.infer<typeof PlanSchema>
export type PlanInput = z.input<typeof PlanSchema>
export type BasePlan = BaseSchema<
	Plan,
	{
		optional: [
			'description',
		]
	}
>
