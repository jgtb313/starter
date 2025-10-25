import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { RoleDomain } from '@/core/role/role.domain'
import type {
	Role,
	RoleInput,
	UpdatableRoleInput,
} from '@/core/role/role.schema'

export type FindRoleInput = Partial<
	Pick<
		Role,
		| 'workspaceId'
		| 'organizationIds'
		| 'permissionIds'
		| 'name'
		| 'tags'
		| 'status'
	>
>

export type RoleSort = Sort<
	'name' | 'organizationName' | 'permissionName' | 'status' | 'createdAt'
>

type CreateRoleInput = Pick<
	RoleInput,
	| 'workspaceId'
	| 'organizationIds'
	| 'permissionIds'
	| 'name'
	| 'tags'
	| 'status'
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
	updateById(roleId: string, input: UpdatableRoleInput): Promise<RoleDomain>
	deleteById(roleId: string): Promise<void>

	validateIds(roleIds: string[]): Promise<void>
	validateIdsByOrganizationId(
		organizationId: string,
		roleId: string[],
	): Promise<void>
}
