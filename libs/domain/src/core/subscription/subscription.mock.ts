import { uuid } from '@starter/common'

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
): SubscriptionInput => {
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

	return {
		...base,
		...overrides,
	} as SubscriptionInput
}

export const subscriptionMocks: Subscription[] = []
