import { ConflictException } from '@starter/nestjs-error-handling'

import { type User, type UserInput, UserSchema } from '@/core/user/user.schema'
import { BaseDomain } from '@/support/base-domain'

export class UserDomain extends BaseDomain<User, UserInput> {
	constructor(user: UserInput) {
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

	markAsActive() {
		this.checkIfCanBeActive()
		this.state.status = 'ACTIVE'
	}

	markAsInactive() {
		this.checkIfCanBeInactive()
		this.state.status = 'INACTIVE'
	}

	assignToWorkspace(workspaceId: string) {
		console.log('this.state.workspaceId', this.state.workspaceId)
		console.log('workspaceId', workspaceId)

		if (this.state.workspaceId) {
			throw new ConflictException(
				'This user is already assigned to a workspace.',
			)
		}

		this.state.workspaceId = workspaceId
	}

	private checkIfCanBeActive() {
		if (this.isActive()) {
			throw new ConflictException('This user is already active.')
		}
	}

	private checkIfCanBeInactive() {
		if (this.isInactive()) {
			throw new ConflictException('This user is already inactive.')
		}
	}
}
