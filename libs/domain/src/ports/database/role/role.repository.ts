import { Pagination, PaginationOutput } from '@starter/schema'

import { Role, BaseRole } from '@/schemas'

export type IRoleRepository = {
  findAll(query: Pagination<Role>): Promise<PaginationOutput<Role>>
  findById(userId: string): Promise<Role>
  findByIds(userId: string[]): Promise<Role[]>
  findOne(input: Partial<Role>): Promise<Role | null>
  create(input: BaseRole): Promise<Role>
  updateById(userId: string, input: Partial<Role>): Promise<Role>
  deleteById(userId: string): Promise<void>
}
