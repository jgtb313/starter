import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import { makeInvoice } from '@/core/invoice/invoice.mock'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'
import { DomainTestModule } from '@/domain.test.module'

describe('InvoiceDomain', () => {
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
		const invoice = makeInvoice({})
		const domain = new InvoiceDomain(invoice, i18nService)
		expect(domain).toBeDefined()
	})
})
