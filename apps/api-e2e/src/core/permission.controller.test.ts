import { describe, expect, it } from 'vitest'

import { listPermissions } from '~/client/services'

describe('Permission', () => {
	it('should list permissions', async () => {
		const response = await listPermissions()

		expect(response).toBeDefined()
		expect(response.data).toBeInstanceOf(Array)
		expect(response.data.length).toBeGreaterThan(0)
	})
})
