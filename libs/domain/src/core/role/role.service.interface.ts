import { Pagination, PaginationOutput } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { BaseRole } from '@/core/role/role.schema'
import { RoleDomain } from '@/core/role/role.domain'

export type RoleWorkspaceReference = WithWorkspaceReference<'roleId'>
export const getRoleWorkspaceReference = createWorkspaceReference('roleId')

type FindRoleInput = Partial<Pick<BaseRole, 'workspaceId' | 'name' | 'tags' | 'status'>> & { organizationIds: string[]; permissionIds: string[] }

type CreateRoleInput = Pick<BaseRole, 'workspaceId' | 'name' | 'tags'> & { organizationIds: string[]; permissionIds: string[] }

type UpdateRoleInput = Partial<Pick<BaseRole, 'name' | 'tags' | 'status'>> & { organizationIds?: string[]; permissionIds?: string[] }

export interface IRoleService {
  getPaginatedRoles(input: Pagination<FindRoleInput>): Promise<PaginationOutput<RoleDomain>>

  getRole(reference: RoleWorkspaceReference): Promise<RoleDomain>

  createRole(input: CreateRoleInput): Promise<RoleDomain>

  updateRole(reference: RoleWorkspaceReference, input: UpdateRoleInput): Promise<RoleDomain>

  activeRole(reference: RoleWorkspaceReference): Promise<RoleDomain>

  inactiveRole(reference: RoleWorkspaceReference): Promise<RoleDomain>

  deleteRole(reference: RoleWorkspaceReference): Promise<void>

  validateRoleIdsByOrganizationId(organizationId: string, roleIds: string[]): Promise<void>
}
