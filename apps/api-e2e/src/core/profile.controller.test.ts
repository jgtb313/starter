import { describe, expect, it } from 'vitest'

import { getProfile } from '~/client/services'
import { ensureAuthenticated } from '../support/utilities'

describe('Profile', () => {
	it('should get profile correctly', async () => {
		await ensureAuthenticated()

		const response = await getProfile()

		expect(response).toBeDefined()
		expect(response.data.userId).toBeDefined()
	})
})
