import { Pagination, PaginationOutput } from '@starter/schema'

import { Plan, BasePlan } from '@/core/plan/plan.schema'
import { PlanDomain } from '@/core/plan/plan.domain'

export interface IPlanService {
  getPaginatedPlans(input: Pagination<Plan>): Promise<PaginationOutput<PlanDomain>>

  getPlan(planId: string): Promise<PlanDomain>

  createPlan(input: Omit<BasePlan, 'externalId'>): Promise<PlanDomain>

  updatePlan(planId: string, input: Partial<Plan>): Promise<PlanDomain>

  deletePlan(planId: string): Promise<void>
}
