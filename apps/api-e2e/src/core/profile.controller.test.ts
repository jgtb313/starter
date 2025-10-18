import { describe, expect, it } from 'vitest'

import { getProfile, signUp } from '~/client/services'
import type { SignUpMutationRequest } from '~/client/types'

describe('Profile', () => {
	it('should get profile', async () => {
		const email = `test-${Date.now()}@example.com`
		const user: SignUpMutationRequest = {
			name: 'Test User',
			email: email,
			password: 'Am12lpaqde@',
		}

		const {
			data: { accessToken },
		} = await signUp(user)

		const response = await getProfile(
			{},
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		).catch((error) => {
			console.log(error)
			return error
		})

		expect(response.status).toBe(200)
	})
})
