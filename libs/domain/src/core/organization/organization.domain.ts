import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'

import {
	type Organization,
	type OrganizationInput,
	OrganizationSchema,
} from '@/core/organization/organization.schema'

export class OrganizationDomain extends BaseDomain<
	Organization,
	OrganizationInput
> {
	constructor(organization: OrganizationInput) {
		super(OrganizationSchema, organization)
	}

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isInactive() {
		return this.state.status === 'INACTIVE'
	}

	markAsActive() {
		this.checkIfCanBeActive()
		this.state.status = 'ACTIVE'
	}

	markAsInactive() {
		this.checkIfCanBeInactive()
		this.state.status = 'INACTIVE'
	}

	private checkIfCanBeActive() {
		if (this.isActive()) {
			throw new ConflictException(`This organization is already active.`)
		}
	}

	private checkIfCanBeInactive() {
		if (this.isInactive()) {
			throw new ConflictException(`This organization is already inactive.`)
		}
	}
}
