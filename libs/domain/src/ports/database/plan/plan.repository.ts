import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { PlanDomain } from '@/core/plan/plan.domain'
import type { Plan, PlanInput } from '@/core/plan/plan.schema'

export type FindPlanInput = Partial<
	Pick<Plan, 'name' | 'description' | 'status'>
>

export type PlanSort = Sort<'name' | 'description' | 'status'>

export type IPlanRepository = {
	findPaginated(
		input: Merge<
			[
				FindPlanInput,
				PlanSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<PlanDomain>>
	find(
		input: Merge<
			[
				FindPlanInput,
				PlanSort,
			]
		>,
	): Promise<PlanDomain[]>
	findById(planId: string): Promise<PlanDomain>
	findDefault(): Promise<PlanDomain>
	create(input: PlanInput): Promise<PlanDomain>
	updateById(planId: string, input: Partial<PlanInput>): Promise<PlanDomain>
	deleteById(planId: string): Promise<void>
}
