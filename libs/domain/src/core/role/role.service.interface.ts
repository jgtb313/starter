import { Pagination, PaginationOutput } from '@starter/schema'

import { BaseRole } from '@/core/role/role.schema'
import { RoleDomain } from '@/core/role/role.domain'

type FindRoleInput = Partial<Pick<BaseRole, 'workspaceId' | 'name' | 'tags' | 'status'>> & { organizationIds: string[]; permissionIds: string[] }

type CreateRoleInput = Pick<BaseRole, 'workspaceId' | 'name' | 'tags'> & { organizationIds: string[]; permissionIds: string[] }

type UpdateRoleInput = Partial<Pick<BaseRole, 'name' | 'tags' | 'status'>> & { organizationIds?: string[]; permissionIds?: string[] }

export interface IRoleService {
  getPaginatedRoles(input: Pagination<FindRoleInput>): Promise<PaginationOutput<RoleDomain>>

  getRole(roleId: string): Promise<RoleDomain>

  createRole(input: CreateRoleInput): Promise<RoleDomain>

  updateRole(roleId: string, input: UpdateRoleInput): Promise<RoleDomain>

  activeRole(roleId: string): Promise<RoleDomain>

  inactiveRole(roleId: string): Promise<RoleDomain>

  deleteRole(roleId: string): Promise<void>

  validateRoleIdsByOrganizationId(organizationId: string, roleIds: string[]): Promise<void>
}
