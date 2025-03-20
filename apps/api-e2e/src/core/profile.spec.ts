import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import client, {
  getProfile,
  updateProfile,
  updateProfileEmail,
  updateProfilePhone,
  updateProfilePassword,
  deactivateProfile,
  sendUpdateEmailOTP,
  sendUpdatePhoneOTP,
} from '@starter/client'

import { generateUser, generateName, generateEmail, generatePhoneNumber, ensureAuthenticated } from '@/support/utilities'

describe('Profile', () => {
  const { name, email, password } = generateUser()

  beforeAll(async () => {
    await ensureAuthenticated({ name, email, password })
  })

  afterAll(() => {
    client.unauthenticate()
  })

  describe('Get Profile', () => {
    it('should retrieve the user profile successfully', async () => {
      const profile = await getProfile({})

      expect(profile.email).toBe(email)
    })
  })

  describe('Update Profile', () => {
    it('should update the user profile successfully', async () => {
      const newName = generateName()

      const profile = await updateProfile({
        name: newName,
      })

      expect(profile.name.toLowerCase()).toBe(newName.toLowerCase())
    })
  })

  describe('Update Profile Email', () => {
    it('should update the user email successfully', async () => {
      const newEmail = generateEmail()

      const { otpId } = await sendUpdateEmailOTP({
        email,
      })

      const profile = await updateProfileEmail({
        email: newEmail,
        otpVerification: {
          otpId,
          code: '0000',
        },
      })

      expect(profile.email).toBe(newEmail)
    })
  })

  describe('Update Profile Phone', () => {
    it('should update the user phone successfully', async () => {
      const phoneNumber = generatePhoneNumber()

      const { otpId } = await sendUpdatePhoneOTP({
        channel: 'SMS',
        phone: {
          iso: 'BR',
          ddi: '+55',
          number: phoneNumber,
        },
      })

      const profile = await updateProfilePhone({
        phone: {
          iso: 'BR',
          ddi: '+55',
          number: phoneNumber,
        },
        otpVerification: {
          otpId,
          code: '0000',
        },
      })

      expect(profile.phone).toStrictEqual({
        iso: 'BR',
        ddi: '+55',
        number: phoneNumber,
      })
    })
  })

  describe('Update Profile Password', () => {
    it('should update the user password successfully', async () => {
      await expect(
        updateProfilePassword({
          currentPassword: password,
          password: 'newPassword',
        }),
      ).resolves.not.toThrow()
    })
  })

  describe('Deactivate Profile', () => {
    it('should deactivate the user profile successfully', async () => {
      await expect(deactivateProfile({})).resolves.not.toThrow()
    })
  })
})
