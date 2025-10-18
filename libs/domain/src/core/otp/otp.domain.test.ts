import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { OTPDomain } from '@/core/otp/otp.domain'
import { makeOTP } from '@/core/otp/otp.mock'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'
import { DomainTestModule } from '@/domain.test.module'

describe('OTPDomain', () => {
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
		const otp = makeOTP({})
		const domain = new OTPDomain(otp, i18nService)
		expect(domain).toBeDefined()
	})
})
