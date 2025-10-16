import { ConflictException } from '@starter/nestjs-error-handling'

import { Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type Role, RoleSchema } from '@/core/role/role.schema'

@Injectable()
export class RoleDomain extends BaseDomain<Role> {
	constructor(role: Role) {
		super(RoleSchema, role)
	}

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isInactive() {
		return this.state.status === 'INACTIVE'
	}

	checkIfCanActivate() {
		if (this.isInactive()) {
			throw new ConflictException(
				this.i18nService.current.roleAlreadyInactive(),
			)
		}
	}

	checkIfCanDeactivate() {
		if (this.isActive()) {
			throw new ConflictException(this.i18nService.current.roleAlreadyActive())
		}
	}
}
