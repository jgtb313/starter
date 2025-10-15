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
		email: null,
		phone: null,
		document: null,
		logo: null,
		domain: null,
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
		email: 'contact@brightfuture.com',
		phone: {
			iso: 'US',
			ddi: '+1',
			number: '5551234567',
		},
		document: {
			type: 'COMPANY',
			number: '12345678000199',
		},
		logo: 'https://example.com/logos/brightfuture.png',
		domain: 'brightfuture.com',
		status: 'ACTIVE',
	}),
	makeOrganization({
		name: 'GreenField Solutions',
		email: 'info@greenfield.io',
		document: {
			type: 'COMPANY',
			number: '98765432000188',
		},
		status: 'INACTIVE',
	}),
	makeOrganization({
		name: 'CloudHaven Ltd.',
		email: 'hello@cloudhaven.tech',
		phone: {
			iso: 'GB',
			ddi: '+44',
			number: '2071234567',
		},
		logo: 'https://example.com/logos/cloudhaven.png',
		domain: 'cloudhaven.tech',
		status: 'ACTIVE',
	}),
	makeOrganization({
		name: 'SilentWave Corp.',
		email: 'contact@silentwave.co',
		status: 'INACTIVE',
	}),
	makeOrganization({
		name: 'QuantumEdge',
		email: 'team@quantumedge.io',
		phone: {
			iso: 'BR',
			ddi: '+55',
			number: '11987654321',
		},
		document: {
			type: 'COMPANY',
			number: '11223344000155',
		},
		logo: 'https://example.com/logos/quantumedge.png',
		domain: 'quantumedge.io',
		status: 'ACTIVE',
	}),
	makeOrganization({
		name: 'TechNova LLC',
		email: 'support@technova.com',
		document: {
			type: 'COMPANY',
			number: '55667788000166',
		},
		domain: 'technova.com',
		status: 'ACTIVE',
	}),
	makeOrganization({
		name: 'DataFlow Systems',
		status: 'INACTIVE',
	}),
]
