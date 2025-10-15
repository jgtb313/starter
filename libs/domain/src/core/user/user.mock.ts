import { uuid } from '@starter/common'

import { UserDomain } from '@/core/user/user.domain'
import type { User } from '@/core/user/user.schema'

type UserOverrides = Partial<User>

export const makeUser = (overrides: UserOverrides): UserDomain => {
	const base: User = {
		userId: uuid(),
		workspaceId: uuid(),
		googleProviderId: null,
		facebookProviderId: null,
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: null,
		birthday: null,
		document: null,
		addresses: [],
		avatar: null,
		localePreference: null,
		password: 'hashedPassword',
		status: 'ONBOARDING',
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
		name: 'John Doe',
		email: 'john.doe@example.com',
		status: 'ONBOARDING',
	}),
	makeUser({
		name: 'Jane Doe',
		email: 'jane.doe@example.com',
		status: 'ONBOARDING',
	}),
	makeUser({
		name: 'Jim Doe',
		email: 'jim.doe@example.com',
		status: 'ONBOARDING',
	}),
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
