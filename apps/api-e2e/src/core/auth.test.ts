import { describe, it, expect } from 'vitest'
import client from '@starter/client'

export const unsafe = (value: unknown): any => value

describe('Auth', () => {
  describe('Sign-In', () => {
    it('should authenticate a user with valid email and password', async () => {
      const response = await client.auth.signIn({ email: 'jgtb313@gmail.com', password: '123123123' })

      expect(response.accessToken).toBeDefined()
    })

    it('should return 401 for invalid password', async () => {
      await expect(client.auth.signIn({ email: 'jgtb313@gmail.com', password: 'anypassword' })).rejects.toMatchObject({
        statusCode: 401,
        error: 'Auth Error',
        message: 'Invalid access data',
      })
    })

    it('should return 401 for non-existent user', async () => {
      await expect(client.auth.signIn({ email: 'nonexistent@example.com', password: 'anypassword' })).rejects.toMatchObject({
        statusCode: 401,
        error: 'Auth Error',
        message: 'Invalid access data',
      })
    })

    it('should return 400 for missing email and password', async () => {
      const input = unsafe({ email: '', password: '' })

      await expect(client.auth.signIn(input)).rejects.toMatchObject({
        statusCode: 400,
        error: 'Bad Request Error',
        issues: [
          {
            email: 'Must contain at least 1 character(s)',
          },
          {
            email: 'Invalid email',
          },
          {
            password: 'Must contain at least 1 character(s)',
          },
        ],
      })
    })

    it('should return 400 for invalid email format', async () => {
      await expect(client.auth.signIn({ email: 'invalid-email', password: 'anypassword' })).rejects.toMatchObject({
        statusCode: 400,
        error: 'Bad Request Error',
        issues: [{ email: 'Invalid email' }],
      })
    })
  })

  describe('Social Sign-On', () => {})

  describe('Sign Up', () => {})

  describe('Forgot Password', () => {})
})
