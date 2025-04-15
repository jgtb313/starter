import { Pagination, PaginationOutput } from '@starter/schema'

import { Plan, BasePlan } from '@/schemas'

export interface IPlanService {
  getPaginatedPlans(input: Pagination<Plan>): Promise<PaginationOutput<Plan>>

  getPlan(planId: string): Promise<Plan>

  createPlan(input: BasePlan): Promise<Plan>

  updatePlan(planId: string, input: Partial<Plan>): Promise<Plan>

  deletePlan(planId: string): Promise<void>
}
