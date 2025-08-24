import type { Pagination, PaginationOutput } from '@starter/schema'

import type { PlanDomain } from '@/core/plan/plan.domain'
import type { BasePlan, Plan } from '@/core/plan/plan.schema'

export type IPlanRepository = {
	findAllPaginated(
		input: Pagination<Plan>,
	): Promise<PaginationOutput<PlanDomain>>
	findAll(input: Partial<Plan>): Promise<PlanDomain[]>
	findById(planId: string): Promise<PlanDomain>
	create(input: BasePlan): Promise<PlanDomain>
	updateById(planId: string, input: Partial<Plan>): Promise<PlanDomain>
}
