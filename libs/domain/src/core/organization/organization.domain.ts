import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'

import {
	type Organization,
	type OrganizationInput,
	OrganizationSchema,
	OrganizationStatusEnum,
} from '@/core/organization/organization.schema'

export class OrganizationDomain extends BaseDomain<
	Organization,
	OrganizationInput
> {
	constructor(organization: OrganizationInput) {
		super(OrganizationSchema, organization)
	}

	isActive() {
		return this.state.status === OrganizationStatusEnum.ACTIVE
	}

	isInactive() {
		return this.state.status === OrganizationStatusEnum.INACTIVE
	}

	markAsActive() {
		this.checkIfCanBeActive()
		this.state.status = OrganizationStatusEnum.ACTIVE
	}

	markAsInactive() {
		this.checkIfCanBeInactive()
		this.state.status = OrganizationStatusEnum.INACTIVE
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
