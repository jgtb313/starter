import { describe, expect, it } from 'vitest'

import { makeRole } from '@/core/role/role.mock'

describe('RoleDomain', () => {
	it('should render domain correctly', () => {
		const role = makeRole({})

		expect(role.state).toBeDefined()
	})
})
