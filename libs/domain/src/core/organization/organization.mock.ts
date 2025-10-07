import { uuid } from '@starter/common'

import {
	type Organization,
	type OrganizationInput,
	OrganizationSchema,
} from '@/core/organization/organization.schema'

type OrganizationOverrides = Partial<OrganizationInput>

export const makeOrganization = (
	overrides: OrganizationOverrides,
): Organization => {
	const base: OrganizationInput = {
		organizationId: uuid(),
		workspaceId: uuid(),
		name: 'Delta Inc',
		deletedAt: null,
		status: 'ACTIVE',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return OrganizationSchema.parse({
		...base,
		...overrides,
	})
}

export const organizationMocks: Organization[] = [
	makeOrganization({
		name: 'BrightFuture Inc.',
		status: 'ACTIVE',
	}),
	makeOrganization({
		name: 'GreenField Solutions',
		status: 'INACTIVE',
	}),
	makeOrganization({
		name: 'CloudHaven Ltd.',
		status: 'ACTIVE',
	}),
	makeOrganization({
		name: 'SilentWave Corp.',
		status: 'INACTIVE',
	}),
	makeOrganization({
		name: 'QuantumEdge',
		deletedAt: new Date().toISOString(),
		status: 'ACTIVE',
	}),
]
