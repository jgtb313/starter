import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import {
	createWorkspaceReference,
	type WithWorkspaceReference,
} from '@/support/workspace-reference'

import type { RoleDomain } from '@/core/role/role.domain'
import type { BaseRole } from '@/core/role/role.schema'

type RoleWorkspaceReference = WithWorkspaceReference<'roleId'>
export const getRoleWorkspaceReference = createWorkspaceReference('roleId')

type RoleSort = Sort<
	'name' | 'organizationName' | 'permissionName' | 'status' | 'createdAt'
>

type FindRoleInput = Partial<
	Pick<BaseRole, 'workspaceId' | 'name' | 'tags' | 'status'> & {
		organizationIds: string[]
		permissionIds: string[]
	}
>

type CreateRoleInput = Pick<BaseRole, 'workspaceId' | 'name' | 'tags'> & {
	organizationIds: string[]
	permissionIds: string[]
}

type UpdateRoleInput = Partial<Pick<BaseRole, 'name' | 'tags' | 'status'>> & {
	organizationIds?: string[]
	permissionIds?: string[]
}

export interface IRoleService {
	getPaginatedRoles(
		input: Merge<
			[
				FindRoleInput,
				Pagination,
				RoleSort,
			]
		>,
	): Promise<PaginationOutput<RoleDomain>>

	getRole(reference: RoleWorkspaceReference): Promise<RoleDomain>

	createRole(input: CreateRoleInput): Promise<RoleDomain>

	updateRole(
		reference: RoleWorkspaceReference,
		input: UpdateRoleInput,
	): Promise<RoleDomain>

	activeRole(reference: RoleWorkspaceReference): Promise<RoleDomain>

	inactiveRole(reference: RoleWorkspaceReference): Promise<RoleDomain>

	deleteRole(reference: RoleWorkspaceReference): Promise<void>

	validateRoleIds(roleIds: string[]): Promise<void>

	validateRoleIdsByOrganizationId(
		organizationId: string,
		roleIds: string[],
	): Promise<void>
}
