import { z } from '@/zod'

import { PlanSchema } from './Plan.schema'

export const GetPlanByIdSchema = PlanSchema.pick({
  id: true
})
export const GetPlanByIdSchemaOutput = PlanSchema
export type GetPlanByIdInput = z.infer<typeof GetPlanByIdSchema>
export type GetPlanByIdOutput = z.infer<typeof GetPlanByIdSchemaOutput>
