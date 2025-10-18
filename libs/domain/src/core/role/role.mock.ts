import { uuid } from '@starter/common'

import type { Role, RoleInput } from '@/core/role/role.schema'

type RoleOverrides = Partial<RoleInput>

export const makeRole = (overrides: RoleOverrides): RoleInput => {
	const base: RoleInput = {
		roleId: uuid(),
		workspaceId: uuid(),
		organizations: [],
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
