import { z } from '@starter/schema'

import { ID, DeletedAt, CreatedAt, UpdatedAt, BaseSchema } from '@/support/schema'
import { RecurrenceIntervalEnum } from '@/ports/recurrence'

export enum PlanFeatureCodeEnum {
  'ORGANIZATION_COUNT' = 'ORGANIZATION_COUNT',
}

export enum PlanStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

const PlanId = ID('plan')

const ExternalId = z.string().min(1)

const Name = z.string().min(1)

const Description = z.string().min(1)

const Amount = z.number().positive()

const Interval = z.enum(RecurrenceIntervalEnum)

const IntervalCount = z.number().default(1)

const TrialDays = z.number()

const BaseFeature = z.object({
  description: z.string().min(1),
})

const OrganizationCountFeature = BaseFeature.extend({
  code: z.literal(PlanFeatureCodeEnum.ORGANIZATION_COUNT),
  props: z.object({
    maxOrganizations: z.number().positive().default(1),
  }),
})

export const PlanFeaturesSchema = z.array(z.discriminatedUnion('code', [OrganizationCountFeature])).default([])

const Highlight = z.boolean().default(false)

const Status = z.enum(PlanStatusEnum).default(PlanStatusEnum.ACTIVE)

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
  deletedAt: DeletedAt,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type Plan = z.infer<typeof PlanSchema>
export type BasePlan = BaseSchema<'planId' | 'externalId' | 'status', Plan>
