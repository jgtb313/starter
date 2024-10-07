import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { Plan } from '@/core/plan/domain'
import { DatabaseFilterInput } from '../Database.support'
import { IRepositoriesMethodOptions } from '../Database.port'

type PlanRepository = Plan['state']

type PlanFindInput = DatabaseFilterInput<PlanRepository> & SortInput & PaginationInput<{}>

export type IPlanRepository = () => {
  index(input: PlanFindInput, options?: IRepositoriesMethodOptions): Promise<Plan[]>
  find(input: PlanFindInput, options?: IRepositoriesMethodOptions): Promise<PaginationOutput<Plan>>
  findById(id: string, options?: IRepositoriesMethodOptions): Promise<Plan>
  findOne(input: PlanFindInput, options?: IRepositoriesMethodOptions): Promise<Plan | undefined>
  create(input: Plan, options?: IRepositoriesMethodOptions): Promise<Plan>
  updateById(id: string, input: Partial<Plan>, options?: IRepositoriesMethodOptions): Promise<Plan>
  deleteById(id: string, options?: IRepositoriesMethodOptions): Promise<void>
}
