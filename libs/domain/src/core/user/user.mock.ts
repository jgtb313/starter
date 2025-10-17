import { uuid } from '@starter/common'

import { UserDomain } from '@/core/user/user.domain'
import type { UserInput } from '@/core/user/user.schema'

type UserOverrides = Partial<UserInput>

export const makeUser = (overrides: UserOverrides): UserDomain => {
	const base: UserInput = {
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

export const userMocks: UserDomain[] = []
