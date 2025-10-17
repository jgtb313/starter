import { describe, expect, it } from 'vitest'

import { makePermission } from '@/core/permission/permission.mock'

describe('PermissionDomain', () => {
	it('should create permission correctly', () => {
		const permission = makePermission({})

		expect(permission).toBeDefined()
	})
})
