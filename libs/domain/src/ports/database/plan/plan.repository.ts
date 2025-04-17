import { Pagination, PaginationOutput } from '@starter/schema'

import { Plan, BasePlan } from '@/core/plan/plan.schema'
import { PlanDomain } from '@/core/plan/plan.domain'

export type IPlanRepository = {
  findAllPaginated(input: Pagination<Plan>): Promise<PaginationOutput<PlanDomain>>
  findAll(input: Partial<Plan>): Promise<PlanDomain[]>
  findById(planId: string): Promise<PlanDomain>
  findOne(input: Partial<Plan>): Promise<PlanDomain | null>
  create(input: BasePlan): Promise<PlanDomain>
  updateById(planId: string, input: Partial<Plan>): Promise<PlanDomain>
}
