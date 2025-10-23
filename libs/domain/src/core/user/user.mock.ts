import { uuid } from '@starter/common'

import type { User } from '@/core/user/user.schema'

type UserOverrides = Partial<User>

export const makeUser = (overrides: UserOverrides): User => {
	const base: User = {
		userId: uuid(),
		workspaceId: uuid(),
		googleProviderExternalId: null,
		facebookProviderExternalId: null,
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: null,
		birthday: null,
		document: null,
		addresses: [],
		avatar: null,
		localePreference: null,
		password: 'Abcd1234!',
		status: 'ONBOARDING',
		deletedAt: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return {
		...base,
		...overrides,
	}
}

export const userMocks: User[] = []
