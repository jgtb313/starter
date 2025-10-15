import { BaseDomain } from '@/support/base-domain'
import {
	type Organization,
	OrganizationSchema,
} from '@/core/organization/organization.schema'

export class OrganizationDomain extends BaseDomain<Organization> {
	constructor(organization: Organization) {
		super(OrganizationSchema, organization)
	}

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isInactive() {
		return this.state.status === 'INACTIVE'
	}
}
