import { describe, expect, it } from 'vitest'

import { signIn, signUp } from '~/client/services'
import type { SignUpMutationRequest } from '~/client/types'

describe('Auth Controller', () => {
	it('should sign in correctly', async () => {
		const email = `test-${Date.now()}@example.com`
		const user: SignUpMutationRequest = {
			name: 'Test User',
			email: email,
			password: 'Am12lpaqde@',
		}

		await signUp(user)

		const response = await signIn(user)

		expect(response.status).toBe(200)
	})

	it('should sign up correctly', async () => {
		const email = `test-${Date.now()}@example.com`
		const response = await signUp({
			name: 'Test User',
			email: email,
			password: 'Am12lpaqde@',
		})

		expect(response.status).toBe(201)
	})
})
