import { Pagination, PaginationOutput } from '@starter/schema'

import { Role, BaseRole } from '@/core/role/role.schema'
import { RoleDomain } from '@/core/role/role.domain'

export type IRoleRepository = {
  findAllPaginated(input: Pagination<Role>): Promise<PaginationOutput<RoleDomain>>
  findAll(input: Partial<Role>): Promise<RoleDomain[]>
  findById(roleId: string): Promise<RoleDomain>
  create(input: BaseRole): Promise<RoleDomain>
  updateById(roleId: string, input: Partial<Role>): Promise<RoleDomain>
  deleteById(roleId: string): Promise<void>
  validateIdsByOrganizationId(organizationId: string, roleId: string[]): Promise<void>
}
