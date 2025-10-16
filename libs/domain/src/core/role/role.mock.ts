import { uuid } from '@starter/common'

import { organizationMocks } from '@/core/organization/organization.mock'
import { permissionMocks } from '@/core/permission/permission.mock'
import { type Role, type RoleInput, RoleSchema } from '@/core/role/role.schema'

type RoleOverrides = Partial<RoleInput>

export const makeRole = (overrides: RoleOverrides): Role => {
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

	return RoleSchema.parse({
		...base,
		...overrides,
	})
}

export const roleMocks: Role[] = [
	// makeRole({
	// 	name: 'Admin',
	// 	status: 'ACTIVE',
	// 	tags: [
	// 		'management',
	// 		'full-access',
	// 	],
	// 	organizations: [
	// 		organizationMocks[0],
	// 	],
	// 	permissions: [
	// 		permissionMocks[0],
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'Editor',
	// 	status: 'INACTIVE',
	// 	tags: [
	// 		'content',
	// 		'edit',
	// 	],
	// 	organizations: [
	// 		organizationMocks[0],
	// 	],
	// 	permissions: [
	// 		permissionMocks[0],
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'Viewer',
	// 	status: 'ACTIVE',
	// 	tags: [
	// 		'read-only',
	// 	],
	// 	organizations: [
	// 		organizationMocks[1],
	// 	],
	// 	permissions: [
	// 		permissionMocks[0],
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'Analyst',
	// 	status: 'INACTIVE',
	// 	tags: [
	// 		'data',
	// 		'reports',
	// 	],
	// 	organizations: [
	// 		organizationMocks[1],
	// 	],
	// 	permissions: [
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'Contributor',
	// 	status: 'ACTIVE',
	// 	tags: [
	// 		'content',
	// 		'submit',
	// 	],
	// 	organizations: [
	// 		organizationMocks[2],
	// 	],
	// 	permissions: [
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'Moderator',
	// 	status: 'INACTIVE',
	// 	tags: [
	// 		'community',
	// 		'moderation',
	// 	],
	// 	organizations: [
	// 		organizationMocks[2],
	// 	],
	// 	permissions: [
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'Support',
	// 	status: 'ACTIVE',
	// 	tags: [
	// 		'helpdesk',
	// 	],
	// 	organizations: [
	// 		organizationMocks[2],
	// 	],
	// 	permissions: [
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'Operator',
	// 	status: 'INACTIVE',
	// 	tags: [
	// 		'ops',
	// 	],
	// 	organizations: [
	// 		organizationMocks[3],
	// 	],
	// 	permissions: [
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'HR',
	// 	status: 'ACTIVE',
	// 	tags: [
	// 		'employees',
	// 		'hiring',
	// 	],
	// 	organizations: [
	// 		organizationMocks[4],
	// 	],
	// 	permissions: [
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
	// makeRole({
	// 	name: 'Developer',
	// 	status: 'INACTIVE',
	// 	tags: [
	// 		'tech',
	// 		'code',
	// 	],
	// 	organizations: [
	// 		organizationMocks[4],
	// 	],
	// 	permissions: [
	// 		permissionMocks[1],
	// 		permissionMocks[2],
	// 	],
	// }),
]
