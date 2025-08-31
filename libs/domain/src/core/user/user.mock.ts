import { uuid } from '@starter/common'

import { UserDomain } from '@/core/user/user.domain'
import type { UserInput } from '@/core/user/user.schema'

type UserOverrides = Partial<UserInput>

export const makeUser = (overrides: UserOverrides): UserDomain => {
	const base: UserInput = {
		userId: uuid(),
		workspaceId: uuid(),
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: null,
		avatar: null,
		socialGoogleId: null,
		socialFacebookId: null,
		password: 'hashedPassword',
		status: 'ACTIVE',
		deletedAt: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return new UserDomain({
		...base,
		...overrides,
	})
}

export const userMocks: UserDomain[] = [
	makeUser({
		name: 'Alice Johnson',
		email: 'alice.johnson@example.com',
		phone: {
			iso: 'BR',
			ddi: '+55',
			number: '11999999999',
		},
		status: 'ACTIVE',
	}),
	makeUser({
		name: 'Bob Smith',
		email: 'bob.smith@example.com',
		status: 'INACTIVE',
	}),
	makeUser({
		name: 'Carol White',
		email: 'carol.white@example.com',
		status: 'ACTIVE',
	}),
	makeUser({
		name: 'David Lee',
		email: 'david.lee@example.com',
		status: 'INACTIVE',
	}),
	makeUser({
		name: 'Eve Black',
		email: 'eve.black@example.com',
		status: 'ACTIVE',
	}),
	makeUser({
		name: 'Frank Green',
		email: 'frank.green@example.com',
		status: 'INACTIVE',
	}),
	makeUser({
		name: 'Grace Brown',
		email: 'grace.brown@example.com',
		status: 'ACTIVE',
	}),
	makeUser({
		name: 'Henry Adams',
		email: 'henry.adams@example.com',
		status: 'INACTIVE',
	}),
	makeUser({
		name: 'Isabel Clark',
		email: 'isabel.clark@example.com',
		status: 'ACTIVE',
	}),
	makeUser({
		name: 'Jack Wilson',
		email: 'jack.wilson@example.com',
		status: 'INACTIVE',
	}),
]
