import { Pagination, PaginationOutput } from '@starter/schema'

import { Role, BaseRole } from '@/core/role/role.schema'
import { RoleDomain } from '@/core/role/role.domain'

type FindRoleInput = Partial<Pick<BaseRole, 'workspaceId' | 'name' | 'tags' | 'status'>> & { organizationIds: string[]; permissionIds: string[] }

type CreateRoleInput = Pick<BaseRole, 'workspaceId' | 'name' | 'tags' | 'status'> & { organizationIds: string[]; permissionIds: string[] }

type UpdateRoleInput = Partial<Pick<BaseRole, 'name' | 'tags' | 'status'> & { organizationIds: string[]; permissionIds: string[] }>

export type IRoleRepository = {
  findAllPaginated(input: Pagination<FindRoleInput>): Promise<PaginationOutput<RoleDomain>>
  findAll(input: Partial<FindRoleInput>): Promise<RoleDomain[]>
  findById(roleId: string): Promise<RoleDomain>
  create(input: CreateRoleInput): Promise<RoleDomain>
  updateById(roleId: string, input: UpdateRoleInput): Promise<RoleDomain>
  deleteById(roleId: string): Promise<void>
  validateIdsByOrganizationId(organizationId: string, roleId: string[]): Promise<void>
}
