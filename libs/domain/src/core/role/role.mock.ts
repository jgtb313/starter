import { uuid } from '@starter/common'

import { type Role, RoleSchema } from '@/core/role/role.schema'

import { RoleDomain } from './role.domain'

type RoleOverrides = Partial<Role>

export const makeRole = (overrides: RoleOverrides): RoleDomain => {
	const base: Role = {
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

export const roleMocks: Role[] = []
