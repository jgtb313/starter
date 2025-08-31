import { NotFoundException } from '@starter/nestjs-error-handling'
import { describe, expect, it } from 'vitest'

import {
	OTPContextDomain,
	OTPContextValues,
} from '@/core/otp/otp-context.domain'
import type { OTPContext } from '@/core/otp/otp-context.schema'

describe('OTPContextDomain', () => {
	const domain = new OTPContextDomain()

	it.each(Object.keys(OTPContextValues) as OTPContext[])(
		'should return correct context for "%s"',
		(context) => {
			const result = domain.getContext(context as OTPContext)
			expect(result.context).toBe(context)
		},
	)

	it('should throw NotFoundException for invalid context', () => {
		expect(() =>
			domain.getContext('INVALID_CONTEXT' as OTPContext),
		).toThrowError(NotFoundException)
	})
})
