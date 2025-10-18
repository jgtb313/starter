import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import {
	type Organization,
	type OrganizationInput,
	OrganizationSchema,
} from '@/core/organization/organization.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class OrganizationDomain extends BaseDomain<Organization> {
	constructor(
		organization: OrganizationInput,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(OrganizationSchema.parse(organization))
	}
}
