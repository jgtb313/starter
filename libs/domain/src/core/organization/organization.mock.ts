import { uuid } from '@starter/common'

import { OrganizationDomain } from '@/core/organization/organization.domain'
import type { OrganizationInput } from '@/core/organization/organization.schema'

type OrganizationOverrides = Partial<OrganizationInput>

export const makeOrganization = (
	overrides: OrganizationOverrides,
): OrganizationDomain => {
	const base: OrganizationInput = {
		organizationId: uuid(),
		workspaceId: uuid(),
		name: 'Delta Inc',
		email: null,
		phone: null,
		document: null,
		logo: null,
		domain: null,
		status: 'ACTIVE',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return new OrganizationDomain({
		...base,
		...overrides,
	})
}

export const organizationMocks: OrganizationDomain[] = []
