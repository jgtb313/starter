import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { RoleDomain } from '@/core/role/role.domain'
import type { Role, RoleInput } from '@/core/role/role.schema'

type FindRoleInput = Partial<
	Pick<Role, 'workspaceId' | 'name' | 'tags' | 'status'> & {
		organizationIds?: string[]
		permissionIds?: string[]
	}
>

type RoleSort = Sort<
	'name' | 'organizationName' | 'permissionName' | 'status' | 'createdAt'
>

type CreateRoleInput = Pick<
	RoleInput,
	'workspaceId' | 'name' | 'tags' | 'status'
> & {
	organizationIds: string[]
	permissionIds: string[]
}

type UpdateRoleInput = Partial<
	Pick<RoleInput, 'name' | 'tags' | 'status'> & {
		organizationIds: string[]
		permissionIds: string[]
	}
>

export type IRoleRepository = {
	findPaginated(
		input: Merge<
			[
				FindRoleInput,
				RoleSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<RoleDomain>>
	find(
		input: Merge<
			[
				FindRoleInput,
				RoleSort,
			]
		>,
	): Promise<RoleDomain[]>
	findById(roleId: string): Promise<RoleDomain>
	create(input: CreateRoleInput): Promise<RoleDomain>
	updateById(roleId: string, input: UpdateRoleInput): Promise<RoleDomain>
	deleteById(roleId: string): Promise<void>

	validateIds(roleIds: string[]): Promise<void>
	validateIdsByOrganizationId(
		organizationId: string,
		roleId: string[],
	): Promise<void>
}
