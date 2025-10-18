import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe } from 'vitest'

import { OTPContextDomain } from '@/core/otp/otp-context.domain'
import { I18nDomainModule } from '@/domain.i18n.module'

describe('OTPContextDomain', () => {
	let domain: OTPContextDomain

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				I18nDomainModule.register(),
			],
			providers: [
				OTPContextDomain,
			],
		}).compile()

		domain = module.get(OTPContextDomain)
	})
})
