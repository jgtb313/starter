import { signUp } from '~/client/services'
import type { SignUpMutationRequest } from '~/client/types'
import { setupAuthentication } from '../../kubb.client'

export const getRandomKey = () => {
	return `test-${Math.random().toString(36).substring(2, 15)}`
}

export const ensureAuthenticated = async (
	input?: Partial<SignUpMutationRequest>,
) => {
	const key = getRandomKey()
	const {
		data: { accessToken },
	} = await signUp({
		name: `Test User ${key}`,
		email: `${key}@example.com`,
		password: 'Abcd1234@',
		...input,
	})

	setupAuthentication(accessToken)
}
