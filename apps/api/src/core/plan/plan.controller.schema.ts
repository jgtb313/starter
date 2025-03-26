import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { PlanSchema } from '@starter/domain'
import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'

export const ListPlansSchema = createRequestSchema({
  query: PlanSchema.partial().merge(PaginationSchema),
  output: BasePaginationSchemaOutput.merge(z.object({ values: z.array(PlanSchema) })),
})
export type ListPlansRequest = RequestInput<typeof ListPlansSchema>
