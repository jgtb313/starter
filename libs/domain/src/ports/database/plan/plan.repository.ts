import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput } from '@starter/schema'

import type { PlanDomain } from '@/core/plan/plan.domain'
import type { BasePlan, Plan } from '@/core/plan/plan.schema'

type FindPlanInput = Partial<Plan>

export type IPlanRepository = {
	findAllPaginated(
		input: Merge<
			[
				FindPlanInput,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<PlanDomain>>
	findAll(input: Partial<Plan>): Promise<PlanDomain[]>
	findById(planId: string): Promise<PlanDomain>
	create(input: BasePlan): Promise<PlanDomain>
	updateById(planId: string, input: Partial<Plan>): Promise<PlanDomain>
}
