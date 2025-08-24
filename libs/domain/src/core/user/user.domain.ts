import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'

import {
	type User,
	type UserInput,
	UserSchema,
	UserStatusEnum,
} from '@/core/user/user.schema'

export class UserDomain extends BaseDomain<User, UserInput> {
	constructor(user: UserInput) {
		super(UserSchema, user)
	}

	isActive() {
		return this.state.status === UserStatusEnum.ACTIVE
	}

	isInactive() {
		return this.state.status === UserStatusEnum.INACTIVE
	}

	markAsActive() {
		this.checkIfCanBeActive()
		this.state.status = UserStatusEnum.ACTIVE
	}

	markAsInactive() {
		this.checkIfCanBeInactive()
		this.state.status = UserStatusEnum.INACTIVE
	}

	assignToWorkspace(workspaceId: string) {
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
