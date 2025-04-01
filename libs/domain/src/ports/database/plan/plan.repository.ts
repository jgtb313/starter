import { Pagination, PaginationOutput } from '@starter/schema'

import { Plan, BasePlan } from '@/schemas'

export type IPlanRepository = {
  findAllPaginated(input: Pagination<Plan>): Promise<PaginationOutput<Plan>>
  findAll(input: Partial<Plan>): Promise<Plan[]>
  findById(planId: string): Promise<Plan>
  findOne(input: Partial<Plan>): Promise<Plan | null>
  create(input: BasePlan): Promise<Plan>
  updateById(planId: string, input: Partial<Plan>): Promise<Plan>
}
