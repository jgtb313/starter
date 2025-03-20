import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'
import { PlanSchema } from '@starter/domain'

export const ListPlansSchema = PlanSchema.pick({}).partial().merge(z.object({}).partial()).merge(PaginationSchema)
export const ListPlansSchemaOutput = BasePaginationSchemaOutput.merge(z.object({ values: z.array(PlanSchema) }))
export type ListPlansInput = z.infer<typeof ListPlansSchema>
