import { describe, expect, it } from 'vitest'

import { makeUser } from '@/core/user/user.mock'

describe('UserDomain', () => {
	it('should render domain correctly', () => {
		const user = makeUser({
			userId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'Am1234567890@@',
		})

		expect(user.state).toBeDefined()
	})
})
