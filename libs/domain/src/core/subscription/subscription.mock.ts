import { uuid } from '@starter/common'

import { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import type {
	Subscription,
	SubscriptionBoleto,
	SubscriptionCard,
	SubscriptionInput,
	SubscriptionPix,
} from '@/core/subscription/subscription.schema'

type SubscriptionOverrides =
	| Partial<SubscriptionCard>
	| Partial<SubscriptionPix>
	| Partial<SubscriptionBoleto>

export const makeSubscription = (
	overrides: SubscriptionOverrides,
): SubscriptionDomain => {
	const base: SubscriptionInput = {
		subscriptionId: uuid(),
		workspaceId: uuid(),
		planId: uuid(),
		externalId: uuid(),
		paymentMethod: 'CARD',
		card: {
			token: uuid(),
			number: '4111 ********** 11',
			holderName: 'John Doe',
			expirationDate: '12/27',
		},
		payer: {
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: {
				iso: 'BR',
				ddi: '+55',
				number: '11999999999',
			},
			document: {
				type: 'INDIVIDUAL',
				number: '12345678900',
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
		nextBillingDate: new Date(
			new Date().setMonth(new Date().getMonth() + 1),
		).toISOString(),
		deadline: new Date(
			new Date().setDate(new Date().getDate() + 5),
		).toISOString(),
		canceledAt: null,
		status: 'TRIAL',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return new SubscriptionDomain({
		...base,
		...overrides,
	} as Subscription)
}

export const subscriptionMocks: SubscriptionDomain[] = []
