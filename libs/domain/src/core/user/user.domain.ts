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

	checkIfCanActivate() {
		return this.isInactive()
	}

	checkIfCanDeactivate() {
		return this.isActive()
	}
}
