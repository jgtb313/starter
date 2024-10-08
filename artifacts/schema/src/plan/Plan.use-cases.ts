import { z } from '@/zod'

import { FilterableSchema, PaginationSchema, BasePaginationSchemaOutput, SortSchema } from '@/common'
import { PlanSchema } from './Plan.schema'

export const ListAvailablePlansSchema = PlanSchema.pick({}).partial()
export const ListAvailablePlansSchemaOutput = z.array(PlanSchema)
export type ListAvailablePlansInput = z.infer<typeof ListAvailablePlansSchema>
export type ListAvailablePlansOutput = z.infer<typeof ListAvailablePlansSchemaOutput>

export const ListPlansSchema = PlanSchema.pick({})
  .and(PaginationSchema)
  .and(SortSchema)
  .and(
    z
      .object({
        filter: FilterableSchema(['name'], { example: 'Basic' }),
      })
      .partial(),
  )
export const ListPlansSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(PlanSchema).default([]) })
export type ListPlansInput = z.infer<typeof ListPlansSchema>
export type ListPlansOutput = z.infer<typeof ListPlansSchemaOutput>

export const GetPlanSchema = PlanSchema.pick({
  id: true,
})
export const GetPlanSchemaOutput = PlanSchema
export type GetPlanInput = z.infer<typeof GetPlanSchema>
export type GetPlanOutput = z.infer<typeof GetPlanSchemaOutput>

export const CreatePlanSchema = PlanSchema.pick({
  name: true,
  amount: true,
  interval: true,
  intervalCount: true,
  features: true,
})
export const CreatePlanSchemaOutput = PlanSchema
export type CreatePlanInput = z.infer<typeof CreatePlanSchema>
export type CreatePlanOutput = z.infer<typeof CreatePlanSchemaOutput>

export const UpdatePlanSchema = PlanSchema.pick({
  id: true,
}).merge(
  PlanSchema.pick({
    name: true,
    amount: true,
    interval: true,
    intervalCount: true,
    features: true,
  }).partial(),
)
export const UpdatePlanSchemaOutput = PlanSchema
export type UpdatePlanInput = z.infer<typeof UpdatePlanSchema>
export type UpdatePlanOutput = z.infer<typeof UpdatePlanSchemaOutput>

export const ActivePlanSchema = PlanSchema.pick({
  id: true,
})
export const ActivePlanSchemaOutput = PlanSchema
export type ActivePlanInput = z.infer<typeof ActivePlanSchema>
export type ActivePlanOutput = z.infer<typeof ActivePlanSchemaOutput>

export const InactivePlanSchema = PlanSchema.pick({
  id: true,
})
export const InactivePlanSchemaOutput = PlanSchema
export type InactivePlanInput = z.infer<typeof InactivePlanSchema>
export type InactivePlanOutput = z.infer<typeof InactivePlanSchemaOutput>

export const DeletePlanSchema = PlanSchema.pick({
  id: true,
})
export type DeletePlanInput = z.infer<typeof DeletePlanSchema>
export type DeletePlanOutput = void
