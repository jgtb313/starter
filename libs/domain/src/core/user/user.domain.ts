import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import { type User, UserSchema } from '@/core/user/user.schema'

export class UserDomain extends BaseDomain<User> {
	constructor(user: User) {
		super(UserSchema, user)
	}

	isOnboarding() {
		return this.state.status === 'ONBOARDING'
	}

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isInactive() {
		return this.state.status === 'INACTIVE'
	}

	checkIfHasWorkspace() {
		return !!this.state.workspaceId
	}

	checkIfCanActivate() {
		if (this.isActive()) {
			throw new ConflictException(this.i18nService.current.userAlreadyActive())
		}
	}

	checkIfCanDeactivate() {
		if (this.isInactive()) {
			throw new ConflictException(
				this.i18nService.current.userAlreadyInactive(),
			)
		}
	}

	checkIfCanBeOnboarding() {
		if (this.isOnboarding()) {
			throw new ConflictException(
				this.i18nService.current.userAlreadyOnboarding(),
			)
		}
	}
}
