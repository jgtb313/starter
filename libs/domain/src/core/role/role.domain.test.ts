import { describe, expect, it } from 'vitest'

import { makeRole } from '@/core/role/role.mock'

describe('RoleDomain', () => {
	it('should render domain correctly', () => {
		const role = makeRole({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			organizations: [],
			permissions: [],
			name: 'Manager',
			tags: [],
			status: 'ACTIVE',
		})

		expect(role.state).toBeDefined()
	})
})
