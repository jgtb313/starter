import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'

import { type Role, type RoleInput, RoleSchema } from '@/core/role/role.schema'

export class RoleDomain extends BaseDomain<Role, RoleInput> {
	constructor(role: RoleInput) {
		super(RoleSchema, role)
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
			throw new ConflictException('This role is already active.')
		}
	}

	private checkIfCanBeInactive() {
		if (this.isInactive()) {
			throw new ConflictException('This role is already inactive.')
		}
	}
}
