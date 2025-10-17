import { describe, expect, it } from 'vitest'

import { makeSubscription } from '@/core/subscription/subscription.mock'

describe('SubscriptionDomain', () => {
	it('should render domain correctly', () => {
		const subscription = makeSubscription({})

		expect(subscription.state).toBeDefined()
	})
})
