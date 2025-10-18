import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import {
	type Permission,
	type PermissionInput,
	PermissionSchema,
} from '@/core/permission/permission.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class PermissionDomain extends BaseDomain<Permission> {
	constructor(
		permission: PermissionInput,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(PermissionSchema.parse(permission))
	}
}
