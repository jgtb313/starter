import { describe, expect, it } from 'vitest'

import { getRandomKey } from '@/support/utilities'

import { signIn, signUp } from '~/client/services'
import type { SignUpMutationRequest } from '~/client/types'

describe('Auth Controller', () => {
	it('should sign in correctly', async () => {
		const key = getRandomKey()
		const user: SignUpMutationRequest = {
			name: `Test User ${key}`,
			email: `${key}@example.com`,
			password: 'Abcd1234@',
		}

		await signUp(user)

		const response = await signIn(user)

		expect(response.data.accessToken).toBeDefined()
	})

	it('should sign up correctly', async () => {
		const key = getRandomKey()
		const response = await signUp({
			name: `Test User ${key}`,
			email: `${key}@example.com`,
			password: 'Abcd1234@',
		})

		expect(response.data.accessToken).toBeDefined()
	})
})
