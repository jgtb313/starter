import { describe, it, expect } from 'vitest'
import { validateOTP, sendPasswordLessOTP, sendForgotPasswordOTP, sendUpdateEmailOTP, sendUpdatePhoneOTP } from '@starter/client'

import { ensureUserExists, ensureAuthenticated, generatePhoneNumber } from '@/support/utilities'

describe('OTP', () => {
  describe('Validate OTP', () => {
    it('should successfully validate an OTP', async () => {
      const { email } = await ensureUserExists()

      const { otpId } = await sendPasswordLessOTP({
        email,
      })

      await expect(
        validateOTP({
          otpId,
          context: 'PASSWORD_LESS',
          code: '0000',
          recipient: email,
        }),
      ).resolves.toBeDefined()
    })
  })

  describe('Send Password Less OTP', () => {
    it('should send an OTP for password less', async () => {
      const { email } = await ensureUserExists()

      const response = await sendPasswordLessOTP({
        email,
      })

      expect(response.otpId).toBeDefined()
    })
  })

  describe('Send Forgot Password OTP', () => {
    it('should send an OTP for password less', async () => {
      const { email } = await ensureUserExists()

      const response = await sendForgotPasswordOTP({
        email,
      })

      expect(response.otpId).toBeDefined()
    })
  })

  describe('Send Update Email OTP', () => {
    it('should send an OTP for email update', async () => {
      const { user, unauthenticate } = await ensureAuthenticated()

      const response = await sendUpdateEmailOTP({
        email: user.email,
      })

      unauthenticate()

      expect(response.otpId).toBeDefined()
    })
  })

  describe('Send Update Phone OTP', () => {
    it('should send an OTP for phone update', async () => {
      const { unauthenticate } = await ensureAuthenticated()
      const phoneNumber = generatePhoneNumber()

      const response = await sendUpdatePhoneOTP({
        channel: 'SMS',
        phone: {
          iso: 'BR',
          ddi: '+55',
          number: phoneNumber,
        },
      })

      unauthenticate()

      expect(response.otpId).toBeDefined()
    })
  })
})
