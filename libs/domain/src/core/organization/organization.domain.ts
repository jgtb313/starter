import { ConflictException } from '@starter/nestjs-error-handling'

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

	checkIfCanActivate() {
		if (this.isActive()) {
			throw new ConflictException(
				this.i18nService.current.organizationAlreadyActive(),
			)
		}
	}

	checkIfCanDeactivate() {
		if (this.isInactive()) {
			throw new ConflictException(
				this.i18nService.current.organizationAlreadyInactive(),
			)
		}
	}
}
