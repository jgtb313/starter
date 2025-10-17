import { describe, expect, it } from 'vitest'

import { makeSubscription } from '@/core/subscription/subscription.mock'

describe('SubscriptionDomain', () => {
	it('should render domain correctly', () => {
		const subscription = makeSubscription({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			planId: '123e4567-e89b-12d3-a456-426614174000',
			paymentMethod: 'CARD',
			payer: {
				name: 'John Doe',
				email: 'john.doe@example.com',
				phone: {
					iso: 'BR',
					ddi: '+55',
					number: '98991143200',
				},
				document: {
					type: 'INDIVIDUAL',
					number: '05933837377',
				},
				address: {
					state: 'SP',
					city: 'São Paulo',
					zipCode: '01310-100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					number: '1578',
					complement: null,
					landmark: null,
				},
			},
			status: 'ACTIVE',
		})

		expect(subscription.state).toBeDefined()
	})
})
