import { describe, expect, it } from 'vitest'
import { OTPContextEnum, OTPContexts } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { getContext } from './OTP.support'

describe('getContext', () => {
  it('should return the correct context for a valid OTPContextEnum', () => {
    const validContext = OTPContextEnum.UPDATE_EMAIL
    const expectedContext = OTPContexts.find((context) => context.context === validContext)

    const result = getContext(validContext)

    expect(result).toEqual(expectedContext)
  })

  it('should throw NotFoundError if the context is not present in OTPContexts', () => {
    const nonexistentContext = 'nonexistent-context' as OTPContextEnum

    expect(() => getContext(nonexistentContext)).toThrow(NotFoundError)
    expect(() => getContext(nonexistentContext)).toThrow(`OTP Context ${nonexistentContext} not found`)
  })
})
