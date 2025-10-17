import { uuid } from '@starter/common'

import type { RoleInput } from '@/core/role/role.schema'

import { RoleDomain } from './role.domain'

type RoleOverrides = Partial<RoleInput>

export const makeRole = (overrides: RoleOverrides): RoleDomain => {
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

	return new RoleDomain({
		...base,
		...overrides,
	})
}

export const roleMocks: RoleDomain[] = []
