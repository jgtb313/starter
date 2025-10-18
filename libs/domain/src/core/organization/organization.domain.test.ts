import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { OrganizationDomain } from '@/core/organization/organization.domain'
import { makeOrganization } from '@/core/organization/organization.mock'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'
import { DomainTestModule } from '@/domain.test.module'

describe('OrganizationDomain', () => {
	let i18nService: I18nDomainService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
		}).compile()

		i18nService = module.get(I18nDomainSymbol)
	})

	it('should render domain correctly', () => {
		const organization = makeOrganization({})
		const domain = new OrganizationDomain(organization, i18nService)
		expect(domain).toBeDefined()
	})
})
