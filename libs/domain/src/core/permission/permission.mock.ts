import { uuid } from '@starter/common'

import {
	type Permission,
	type PermissionInput,
	PermissionSchema,
} from '@/core/permission/permission.schema'

type PermissionOverrides = Partial<PermissionInput>

export const makePermission = (overrides: PermissionOverrides): Permission => {
	const base: PermissionInput = {
		permissionId: uuid(),
		action: 'workspace:create',
		name: 'Create workspace',
		description: 'Create workspace',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return PermissionSchema.parse({
		...base,
		...overrides,
	})
}

export const permissionMocks: Permission[] = [
	// makePermission({
	// 	action: 'workspace:create',
	// 	name: 'Create workspace',
	// 	description: 'Create workspace',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'user:delete',
	// 	name: 'Delete user',
	// 	description: 'Delete user accounts',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'content:edit',
	// 	name: 'Edit content',
	// 	description: 'Edit existing content',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'content:view',
	// 	name: 'View content',
	// 	description: 'View content only',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'user:delete',
	// 	name: 'Delete user',
	// 	description: 'Delete user accounts',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'reports:view',
	// 	name: 'View reports',
	// 	description: 'Access to reports',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'comments:moderate',
	// 	name: 'Moderate comments',
	// 	description: 'Manage user comments',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'comments:delete',
	// 	name: 'Delete comments',
	// 	description: 'Delete user comments',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'comments:delete',
	// 	name: 'Delete comments',
	// 	description: 'Delete user comments',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'content:create',
	// 	name: 'Create content',
	// 	description: 'Create new content',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
	// makePermission({
	// 	action: 'content:create',
	// 	name: 'Create content',
	// 	description: 'Create new content',
	// 	createdAt: new Date().toISOString(),
	// 	updatedAt: new Date().toISOString(),
	// }),
]
