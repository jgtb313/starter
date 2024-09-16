import { z } from '@/zod'

import { FilterableSchema } from '@/common'
import { PlanSchema } from './Plan.schema'

export const IndexPlanSchema = PlanSchema.pick({}).and(
  z
    .object({
      filter: FilterableSchema(['name'], { example: 'Plano Básico' })
    })
    .partial()
)
export const IndexPlanSchemaOutput = z.array(PlanSchema)
export type IndexPlanInput = z.infer<typeof IndexPlanSchema>
export type IndexPlanOutput = Promise<z.infer<typeof IndexPlanSchemaOutput>>
