import { uuid } from '@starter/common'

import { organizationMocks } from '@/core/organization/organization.mock'
import { permissionMocks } from '@/core/permission/permission.mock'
import { RoleDomain } from '@/core/role/role.domain'
import { type RoleInput, RoleStatusEnum } from '@/core/role/role.schema'

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
		status: RoleStatusEnum.ACTIVE,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return new RoleDomain({
		...base,
		...overrides,
	})
}

export const roleMocks: RoleDomain[] = [
	makeRole({
		name: 'Admin',
		status: RoleStatusEnum.ACTIVE,
		tags: [
			'management',
			'full-access',
		],
		organizations: [
			organizationMocks[0].state,
		],
		permissions: [
			permissionMocks[0].state,
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'Editor',
		status: RoleStatusEnum.INACTIVE,
		tags: [
			'content',
			'edit',
		],
		organizations: [
			organizationMocks[0].state,
		],
		permissions: [
			permissionMocks[0].state,
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'Viewer',
		status: RoleStatusEnum.ACTIVE,
		tags: [
			'read-only',
		],
		organizations: [
			organizationMocks[1].state,
		],
		permissions: [
			permissionMocks[0].state,
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'Analyst',
		status: RoleStatusEnum.INACTIVE,
		tags: [
			'data',
			'reports',
		],
		organizations: [
			organizationMocks[1].state,
		],
		permissions: [
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'Contributor',
		status: RoleStatusEnum.ACTIVE,
		tags: [
			'content',
			'submit',
		],
		organizations: [
			organizationMocks[2].state,
		],
		permissions: [
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'Moderator',
		status: RoleStatusEnum.INACTIVE,
		tags: [
			'community',
			'moderation',
		],
		organizations: [
			organizationMocks[2].state,
		],
		permissions: [
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'Support',
		status: RoleStatusEnum.ACTIVE,
		tags: [
			'helpdesk',
		],
		organizations: [
			organizationMocks[2].state,
		],
		permissions: [
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'Operator',
		status: RoleStatusEnum.INACTIVE,
		tags: [
			'ops',
		],
		organizations: [
			organizationMocks[3].state,
		],
		permissions: [
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'HR',
		status: RoleStatusEnum.ACTIVE,
		tags: [
			'employees',
			'hiring',
		],
		organizations: [
			organizationMocks[4].state,
		],
		permissions: [
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
	makeRole({
		name: 'Developer',
		status: RoleStatusEnum.INACTIVE,
		tags: [
			'tech',
			'code',
		],
		organizations: [
			organizationMocks[4].state,
		],
		permissions: [
			permissionMocks[1].state,
			permissionMocks[2].state,
		],
	}),
]
