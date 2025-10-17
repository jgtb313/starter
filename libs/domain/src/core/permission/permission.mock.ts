import { uuid } from '@starter/common'

import type { PermissionInput } from '@/core/permission/permission.schema'

import { PermissionDomain } from './permission.domain'

type PermissionOverrides = Partial<PermissionInput>

export const makePermission = (
	overrides: PermissionOverrides,
): PermissionDomain => {
	const base: PermissionInput = {
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
