import { describe, expect, it } from 'vitest'

import { makeOrganization } from '@/core/organization/organization.mock'

describe('OrganizationDomain', () => {
	it('should render domain correctly', () => {
		const organization = makeOrganization({})

		expect(organization.state).toBeDefined()
	})
})
