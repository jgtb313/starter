import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type Role, RoleSchema } from '@/core/role/role.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class RoleDomain extends BaseDomain<Role> {
	constructor(
		role: Role,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(RoleSchema.parse(role))
	}
}
