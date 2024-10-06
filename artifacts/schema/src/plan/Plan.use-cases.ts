import { z } from '@/zod'

import { FilterableSchema, PaginationSchema, BasePaginationSchemaOutput, SortSchema } from '@/common'
import { PlanSchema } from './Plan.schema'

export const IndexPlanSchema = PlanSchema.pick({})
  .partial()
  .and(SortSchema)
  .and(
    z
      .object({
        filter: FilterableSchema(['name'], { example: 'Plano Básico' })
      })
      .partial()
  )
export const IndexPlanSchemaOutput = z.array(PlanSchema)
export type IndexPlanInput = z.infer<typeof IndexPlanSchema>
export type IndexPlanOutput = z.infer<typeof IndexPlanSchemaOutput>

export const ListPlanSchema = PlanSchema.pick({})
  .and(PaginationSchema)
  .and(SortSchema)
  .and(
    z
      .object({
        filter: FilterableSchema(['name'], { example: 'example' })
      })
      .partial()
  )
export const ListPlanSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(PlanSchema).default([]) })
export type ListPlanInput = z.infer<typeof ListPlanSchema>
export type ListPlanOutput = z.infer<typeof ListPlanSchemaOutput>

export const GetPlanSchema = PlanSchema.pick({
  id: true
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
  status: true
})
export const CreatePlanSchemaOutput = PlanSchema
export type CreatePlanInput = z.infer<typeof CreatePlanSchema>
export type CreatePlanOutput = z.infer<typeof CreatePlanSchemaOutput>

export const UpdatePlanSchema = PlanSchema.pick({
  id: true
}).and(PlanSchema.pick({}).partial())
export const UpdatePlanSchemaOutput = PlanSchema
export type UpdatePlanInput = z.infer<typeof UpdatePlanSchema>
export type UpdatePlanOutput = z.infer<typeof UpdatePlanSchemaOutput>

export const ActivePlanSchema = PlanSchema.pick({
  id: true
})
export const ActivePlanSchemaOutput = PlanSchema
export type ActivePlanInput = z.infer<typeof ActivePlanSchema>
export type ActivePlanOutput = z.infer<typeof ActivePlanSchemaOutput>

export const InactivePlanSchema = PlanSchema.pick({
  id: true
})
export const InactivePlanSchemaOutput = PlanSchema
export type InactivePlanInput = z.infer<typeof InactivePlanSchema>
export type InactivePlanOutput = z.infer<typeof InactivePlanSchema>

export const DeletePlanSchema = PlanSchema.pick({
  id: true
})
export const DeletePlanSchemaOutput = PlanSchema
export type DeletePlanInput = z.infer<typeof DeletePlanSchema>
export type DeletePlanOutput = z.infer<typeof DeletePlanSchema>
