import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	z,
} from '@starter/schema'
import { PlanSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'

export const ListPlansSchema = createRequestSchema({
	query: PlanSchema.pick({}).partial().and(PaginationSchema),
	output: BasePaginationSchemaOutput.merge(
		z.object({
			values: z.array(PlanSchema),
		}),
	),
})
export type ListPlansRequest = RequestInput<typeof ListPlansSchema>

export const GetPlanSchema = createRequestSchema({
	params: PlanSchema.pick({
		planId: true,
	}),
	output: PlanSchema,
})
export type GetPlanRequest = RequestInput<typeof GetPlanSchema>
