import { uuid } from '@starter/common'

import type { Organization } from '@/core/organization/organization.schema'

type OrganizationOverrides = Partial<Organization>

export const makeOrganization = (
	overrides: OrganizationOverrides,
): Organization => {
	const base: Organization = {
		organizationId: uuid(),
		workspaceId: uuid(),
		name: 'Delta Inc',
		email: null,
		phone: null,
		document: null,
		logo: null,
		domain: null,
		status: 'ACTIVE',
		deletedAt: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	}

	return {
		...base,
		...overrides,
	}
}

export const organizationMocks: Organization[] = []
