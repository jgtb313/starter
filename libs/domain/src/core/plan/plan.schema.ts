import { z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const PlanId = BaseSchema.id('plan')

const ExternalId = z.string().min(1)

const Name = z.string().min(1)

const Description = z.string().min(1)

const BasePlanFeatureStart = z.object({
	planFeatureId: BaseSchema.id('planFeature'),
	description: z.string().min(1),
})
const BasePlanFeatureEnd = z.object({
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

const OrganizationCountFeature = z.object({
	...BasePlanFeatureStart.shape,
	feature: z.literal('ORGANIZATION_COUNT'),
	props: z.object({
		maxOrganizations: z.number().positive(),
	}),
	...BasePlanFeatureEnd.shape,
})

const PlanFeatureSchema = z.discriminatedUnion('feature', [
	OrganizationCountFeature,
])

const PlanIntervalSchema = z.object({
	planIntervalId: BaseSchema.id('planInterval'),
	externalId: z.string().min(1),
	amount: z.number().min(0),
	interval: z.enum([
		'DAY',
		'WEEK',
		'MONTH',
		'YEAR',
	]),
	intervalCount: z.number().default(1),
	trialDays: z.number().default(7),
	status: z
		.enum([
			'ACTIVE',
			'INACTIVE',
		])
		.default('ACTIVE'),
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

const Features = z.array(PlanFeatureSchema).default([])

const Intervals = z.array(PlanIntervalSchema).default([])

const Highlight = z.boolean().default(false)

const Default = z.boolean().default(false)

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
	features: Features,
	intervals: Intervals,
	highlight: Highlight,
	default: Default,
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
			'planId',
		]
	}
>
