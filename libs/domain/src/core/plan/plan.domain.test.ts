import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { PlanDomain } from '@/core/plan/plan.domain'
import { makePlan } from '@/core/plan/plan.mock'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'
import { DomainTestModule } from '@/domain.test.module'

describe('PlanDomain', () => {
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
		const plan = makePlan({})
		const domain = new PlanDomain(plan, i18nService)
		expect(domain).toBeDefined()
	})
})
