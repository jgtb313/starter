import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'

import {
	type Role,
	type RoleInput,
	RoleSchema,
	RoleStatusEnum,
} from '@/core/role/role.schema'

export class RoleDomain extends BaseDomain<Role, RoleInput> {
	constructor(role: RoleInput) {
		super(RoleSchema, role)
	}

	isActive() {
		return this.state.status === RoleStatusEnum.ACTIVE
	}

	isInactive() {
		return this.state.status === RoleStatusEnum.INACTIVE
	}

	markAsActive() {
		this.checkIfCanBeActive()
		this.state.status = RoleStatusEnum.ACTIVE
	}

	markAsInactive() {
		this.checkIfCanBeInactive()
		this.state.status = RoleStatusEnum.INACTIVE
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
