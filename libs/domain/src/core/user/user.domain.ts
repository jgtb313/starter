import { ConflictException, Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type User, UserSchema } from '@/core/user/user.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class UserDomain extends BaseDomain<User> {
	constructor(
		user: User,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(UserSchema.parse(user))
	}

	checkIfAlreadyHasWorkspace() {
		const hasWorkspace = this.state.workspaceId !== null

		if (!hasWorkspace) {
			return
		}

		throw new ConflictException(
			this.i18nService.current.userAlreadyHasWorkspace(),
		)
	}
}
