import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import { type User, type UserInput, UserSchema } from '@/core/user/user.schema'

export class UserDomain extends BaseDomain<User, UserInput> {
	constructor(user: UserInput) {
		super(UserSchema, user)
	}
}
