import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/@common'
import { PlanIntervalEnum, PlanStatusEnum } from './Plan.enums'

const IntegrationId = z.string().min(1)

const Name = z.string().min(1)

const Amount = z.number().min(1)

const Interval = z.nativeEnum(PlanIntervalEnum)

const IntervalCount = z.number().default(1)

const Features = z.array(
  z.object({
    description: z.string().min(1),
    code: z.string().nullish()
  })
)

const Status = z.nativeEnum(PlanStatusEnum)

export const PlanSchema = z.object({
  id: ID,
  integrationId: IntegrationId,
  name: Name,
  amount: Amount,
  interval: Interval,
  intervalCount: IntervalCount,
  features: Features,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Plan = z.infer<typeof PlanSchema>
