import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { PlanSchema } from '@starter/domain'
import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'

export const ListPlansSchema = createRequestSchema({
  query: PlanSchema.pick({}).partial().merge(PaginationSchema),
  output: BasePaginationSchemaOutput.merge(z.object({ values: z.array(PlanSchema) })),
})
export type ListPlansRequest = RequestInput<typeof ListPlansSchema>

export const GetPlanSchema = createRequestSchema({
  params: PlanSchema.pick({
    planId: true,
  }),
  output: PlanSchema,
})
export type GetPlanRequest = RequestInput<typeof GetPlanSchema>
