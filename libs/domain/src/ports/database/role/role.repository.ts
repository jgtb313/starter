import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { RoleDomain } from '@/core/role/role.domain'
import type { BaseRole } from '@/core/role/role.schema'

type RoleSort = Sort<
	'name' | 'organizationName' | 'permissionName' | 'status' | 'createdAt'
>

type FindRoleInput = Partial<
	Pick<BaseRole, 'workspaceId' | 'name' | 'tags' | 'status'> & {
		organizationIds?: string[]
		permissionIds?: string[]
	}
>

type CreateRoleInput = Pick<
	BaseRole,
	'workspaceId' | 'name' | 'tags' | 'status'
> & {
	organizationIds: string[]
	permissionIds: string[]
}

type UpdateRoleInput = Partial<
	Pick<BaseRole, 'name' | 'tags' | 'status'> & {
		organizationIds: string[]
		permissionIds: string[]
	}
>

export type IRoleRepository = {
	findAllPaginated(
		input: Merge<
			[
				FindRoleInput,
				RoleSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<RoleDomain>>
	findAll(input: Partial<FindRoleInput>): Promise<RoleDomain[]>
	findById(roleId: string): Promise<RoleDomain>
	create(input: CreateRoleInput): Promise<RoleDomain>
	updateById(roleId: string, input: UpdateRoleInput): Promise<RoleDomain>
	deleteById(roleId: string): Promise<void>
	validateRoleIds(roleIds: string[]): Promise<void>
	validateIdsByOrganizationId(
		organizationId: string,
		roleId: string[],
	): Promise<void>
}
