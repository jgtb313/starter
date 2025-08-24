import { NotFoundException } from '@starter/nestjs-error-handling'
import { describe, expect, it } from 'vitest'

import { OTPContextDomain, OTPContexts } from '@/core/otp/otp-context.domain'
import type { OTPContextEnum } from '@/core/otp/otp-context.schema'

describe('OTPContextDomain', () => {
	const domain = new OTPContextDomain()

	it.each(Object.keys(OTPContexts) as OTPContextEnum[])(
		'should return correct context for "%s"',
		(context) => {
			const result = domain.getContext(context)
			expect(result.context).toBe(context)
		},
	)

	it('should throw NotFoundException for invalid context', () => {
		expect(() =>
			domain.getContext('INVALID_CONTEXT' as OTPContextEnum),
		).toThrowError(NotFoundException)
	})
})
