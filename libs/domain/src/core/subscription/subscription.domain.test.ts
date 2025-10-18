import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import { makeSubscription } from '@/core/subscription/subscription.mock'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'
import { DomainTestModule } from '@/domain.test.module'

describe('SubscriptionDomain', () => {
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
		const subscription = makeSubscription({})
		const domain = new SubscriptionDomain(subscription, i18nService)
		expect(domain).toBeDefined()
	})
})
