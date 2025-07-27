import { Pagination, PaginationOutput } from '@starter/schema'

import { Role, BaseRole } from '@/core/role/role.schema'
import { RoleDomain } from '@/core/role/role.domain'

type CreateRoleInput = Pick<BaseRole, 'workspaceId' | 'name' | 'tags'> & { organizationIds: string[]; permissions: string[] }

type UpdateRoleInput = Pick<BaseRole, 'name' | 'tags'> & { organizationIds: string[]; permissions: string[] }

export interface IRoleService {
  getPaginatedRoles(input: Pagination<Role>): Promise<PaginationOutput<RoleDomain>>

  getRole(roleId: string): Promise<RoleDomain>

  createRole(input: CreateRoleInput): Promise<RoleDomain>

  updateRole(roleId: string, input: UpdateRoleInput): Promise<RoleDomain>

  activeRole(roleId: string): Promise<RoleDomain>

  inactiveRole(roleId: string): Promise<RoleDomain>

  deleteRole(roleId: string): Promise<void>

  validateRoleIdsByOrganizationId(organizationId: string, roleIds: string[]): Promise<void>
}
