import { Pagination, PaginationOutput } from '@starter/schema'

import { Plan, BasePlan } from '@/schemas'

export type IPlanRepository = {
  findAll(query: Pagination<Plan>): Promise<PaginationOutput<Plan>>
  findById(userId: string): Promise<Plan>
  findOne(input: Partial<Plan>): Promise<Plan | null>
  create(input: BasePlan): Promise<Plan>
  updateById(userId: string, input: Partial<Plan>): Promise<Plan>
  deleteById(userId: string): Promise<void>
}
