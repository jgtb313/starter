import { uuid } from '@starter/common'
import { describe, expect, it } from 'vitest'

import { PermissionDomain } from '@/core/permission/permission.domain'

describe('PermissionDomain', () => {
	it('should create permission correctly', () => {
		const permission = new PermissionDomain({
			permissionId: uuid(),
			action: 'workspace:create',
			name: 'Create workspace',
			description: 'Create workspace',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		})

		expect(permission).toBeDefined()
	})
})
