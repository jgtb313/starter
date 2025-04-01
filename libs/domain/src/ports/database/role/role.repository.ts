import { Pagination, PaginationOutput } from '@starter/schema'

import { Role, BaseRole } from '@/schemas'

export type IRoleRepository = {
  findAllPaginated(input: Pagination<Role>): Promise<PaginationOutput<Role>>
  findAll(input: Partial<Role>): Promise<Role[]>
  findById(roleId: string): Promise<Role>
  findOne(input: Partial<Role>): Promise<Role | null>
  create(input: BaseRole): Promise<Role>
  updateById(roleId: string, input: Partial<Role>): Promise<Role>
  validateIdsByOrganizationId(organizationId: string, roleId: string[]): Promise<void>
}
