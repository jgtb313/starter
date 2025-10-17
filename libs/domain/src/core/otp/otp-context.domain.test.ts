import { NotFoundException } from '@starter/nestjs-error-handling'

import { beforeAll, describe, expect, it, vi } from 'vitest'

import { DomainContext } from '@/support/base-domain'
import {
	OTPContextDomain,
	OTPContextValues,
} from '@/core/otp/otp-context.domain'
import type { OTPContext } from '@/core/otp/otp-context.schema'
import type { I18nDomainService } from '@/domain.i18n.module'

const mockI18nService = {
	current: {
		otpContextNotFound: vi.fn(),
	},
} as unknown as I18nDomainService

describe('OTPContextDomain', () => {
	beforeAll(() => {
		DomainContext.setI18nService(mockI18nService)
	})

	const domain = new OTPContextDomain()

	it.each(Object.keys(OTPContextValues) as OTPContext[])(
		'should return correct context for "%s"',
		(context) => {
			const result = domain.getContext(context)
			expect(result.context).toBe(context)
		},
	)

	it('should throw NotFoundException for invalid context', () => {
		expect(() =>
			domain.getContext('INVALID_CONTEXT' as OTPContext),
		).toThrowError(NotFoundException)
	})
})
