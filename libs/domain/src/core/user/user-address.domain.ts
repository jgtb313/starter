import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type UserAddress, UserAddressSchema } from '@/core/user/user.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class UserAddressDomain extends BaseDomain<UserAddress> {
	constructor(
		address: UserAddress,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(UserAddressSchema.parse(address))
	}
}
