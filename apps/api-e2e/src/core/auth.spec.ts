import { describe, it, expect } from 'vitest'
import { signIn, passwordLess, socialSignOn, signUp, forgotPassword } from '@starter/client'
import { unsafe } from '@starter/common'

import { ensureUserExists, generateUser } from '@/support/utilities'

describe('Auth', () => {
  describe('Sign-In', () => {
    it('should authenticate a user with valid email and password', async () => {
      const { email, password } = await ensureUserExists()

      const response = await signIn({ email, password })

      expect(response.accessToken).toBeDefined()
    })

    it('should return 401 for invalid account', async () => {
      await expect(signIn({ email: 'invalid@email.com', password: 'anypassword' })).rejects.toMatchObject({
        statusCode: 401,
        error: 'Unauthorized Error',
        message: 'Invalid access data.',
      })
    })

    it('should return input validation errors', async () => {
      const input = unsafe({})

      await expect(signIn(input)).rejects.toMatchObject({
        statusCode: 400,
        error: 'Bad Request Error',
        issues: [
          {
            email: 'Campo obrigatório',
          },
          {
            password: 'Campo obrigatório',
          },
        ],
      })
    })
  })

  describe('Password Less', () => {
    it('should successfully authenticate a user using OTP', async () => {
      const { email } = await ensureUserExists()

      const response = await passwordLess({
        email,
        otpVerification: { otpId: 'b22a43c1-7ae1-4007-b8fd-b1ba9bad35a1', code: '0000' },
      })

      expect(response.accessToken).toBeDefined()
    })

    it('should return input validation errors', async () => {
      const input = unsafe({})

      await expect(forgotPassword(input)).rejects.toMatchObject({
        statusCode: 400,
        error: 'Bad Request Error',
        issues: [
          {
            email: 'Campo obrigatório',
          },
          {
            password: 'Campo obrigatório',
          },
          {
            otpVerification: 'Campo obrigatório',
          },
        ],
      })
    })
  })

  describe('Social Sign-On', () => {
    it('should authenticate a user via social provider and return an access token', async () => {
      const response = await socialSignOn({
        context: 'FACEBOOK',
        providerToken: 'test',
      })

      expect(response.accessToken).toBeDefined()
    })
  })

  describe('Sign Up', () => {
    it('should successfully sign up a user and generate a token', async () => {
      const user = generateUser()

      const response = await signUp(user)

      expect(response.accessToken).toBeDefined()
    })

    it('should return an error if email already exists', async () => {
      const user = await ensureUserExists()

      await expect(signUp(user)).rejects.toMatchObject({
        statusCode: 409,
        error: 'Conflict Error',
        message: `E-mail ${user.email} has already been taken.`,
      })
    })

    it('should return input validation errors', async () => {
      const input = unsafe({})

      await expect(signUp(input)).rejects.toMatchObject({
        statusCode: 400,
        error: 'Bad Request Error',
        issues: [
          {
            name: 'Campo obrigatório',
          },
          {
            email: 'Campo obrigatório',
          },
          {
            password: 'Campo obrigatório',
          },
        ],
      })
    })
  })

  describe('Forgot Password', () => {
    it('should successfully send a recovery email and update user token', async () => {
      const { email } = await ensureUserExists()

      const response = await forgotPassword({
        email,
        password: 'newPassword',
        otpVerification: {
          otpId: 'b22a43c1-7ae1-4007-b8fd-b1ba9bad35a1',
          code: '0000',
        },
      })

      expect(response.accessToken).toBeDefined()
    })

    it('should return input validation errors', async () => {
      const input = unsafe({})

      await expect(forgotPassword(input)).rejects.toMatchObject({
        statusCode: 400,
        error: 'Bad Request Error',
        issues: [
          {
            email: 'Campo obrigatório',
          },
          {
            password: 'Campo obrigatório',
          },
          {
            otpVerification: 'Campo obrigatório',
          },
        ],
      })
    })
  })
})
