import { uuid } from '@starter/common'

import type { Role } from '@/core/role/role.schema'

type RoleOverrides = Partial<Role>

export const makeRole = (overrides: RoleOverrides): Role => {
	const base: Role = {
		roleId: uuid(),
		workspaceId: uuid(),
		organizationIds: [],
		organizations: [],
		permissionIds: [],
		permissions: [],
		name: 'Manager',
		tags: [],
		deletedAt: null,
		status: 'ACTIVE',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return {
		...base,
		...overrides,
	}
}

export const roleMocks: Role[] = []
