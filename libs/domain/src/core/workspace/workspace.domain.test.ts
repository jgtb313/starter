import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import { makeWorkspace } from '@/core/workspace/workspace.mock'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'
import { DomainTestModule } from '@/domain.test.module'

describe('WorkspaceDomain', () => {
	let i18nService: I18nDomainService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register({
					withDatabase: false,
				}),
			],
		}).compile()

		i18nService = module.get(I18nDomainSymbol)
	})

	it('should render domain correctly', () => {
		const workspace = makeWorkspace({})
		const domain = new WorkspaceDomain(workspace, i18nService)
		expect(domain).toBeDefined()
	})
})
