import { uuid } from '@starter/common'

import type {
	Permission,
	PermissionInput,
} from '@/core/permission/permission.schema'

type PermissionOverrides = Partial<PermissionInput>

export const makePermission = (
	overrides: PermissionOverrides,
): PermissionInput => {
	const base: PermissionInput = {
		permissionId: uuid(),
		action: 'workspace:create',
		name: 'Create workspace',
		description: 'Create workspace',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return {
		...base,
		...overrides,
	}
}

export const permissionMocks: Permission[] = []
