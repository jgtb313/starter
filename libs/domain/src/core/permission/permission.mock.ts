import { uuid } from '@starter/common'

import type { Permission } from '@/core/permission/permission.schema'

import { PermissionDomain } from './permission.domain'

type PermissionOverrides = Partial<Permission>

export const makePermission = (
	overrides: PermissionOverrides,
): PermissionDomain => {
	const base: Permission = {
		permissionId: uuid(),
		action: 'workspace:create',
		name: 'Create workspace',
		description: 'Create workspace',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return new PermissionDomain({
		...base,
		...overrides,
	})
}

export const permissionMocks: PermissionDomain[] = []
