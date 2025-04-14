import { Pagination } from '@starter/schema'

import { Role, BaseRole } from '@/schemas'
import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'

export type RoleWorkspaceReference = WithWorkspaceReference<'roleId'>

export const getRoleWorkspaceReference = createWorkspaceReference('roleId')

export interface IRoleService {
  getPaginatedRoles(input: Pagination<Role>): Promise<Role[]>

  getRole(reference: RoleWorkspaceReference): Promise<Role>

  createRole(input: BaseRole): Promise<Role>

  updateRole(reference: RoleWorkspaceReference, input: Partial<Role>): Promise<Role>

  deleteRole(reference: RoleWorkspaceReference): Promise<void>

  validateRoleIdsByOrganizationId(organizationId: string, roleIds: string[]): Promise<void>
}
