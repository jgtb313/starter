import type { Pagination, PaginationOutput } from '@starter/schema'

import type { PlanDomain } from '@/core/plan/plan.domain'
import type { BasePlan, Plan } from '@/core/plan/plan.schema'

export interface IPlanService {
	getPaginatedPlans(
		input: Pagination<Plan>,
	): Promise<PaginationOutput<PlanDomain>>

	getPlan(planId: string): Promise<PlanDomain>

	createPlan(
		input: Omit<BasePlan, 'externalId' | 'status'>,
	): Promise<PlanDomain>

	updatePlan(planId: string, input: Partial<Plan>): Promise<PlanDomain>

	deletePlan(planId: string): Promise<void>
}
