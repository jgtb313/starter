import { uuid } from '@starter/common'

import { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import type {
	Subscription,
	SubscriptionBoleto,
	SubscriptionCard,
	SubscriptionPix,
} from '@/core/subscription/subscription.schema'

type SubscriptionOverrides =
	| Partial<SubscriptionCard>
	| Partial<SubscriptionPix>
	| Partial<SubscriptionBoleto>

export const makeSubscription = (
	overrides: SubscriptionOverrides,
): SubscriptionDomain => {
	const base: Subscription = {
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
		nextBillingDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
		deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
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

export const subscriptionMocks: SubscriptionDomain[] = [
	makeSubscription({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
		planId: 'plan_001',
		paymentMethod: 'CARD',
		card: {
			token: 'tok_card_001',
			number: '4111 ********** 11',
			holderName: 'Alice Johnson',
			expirationDate: '12/27',
		},
		status: 'TRIAL',
	}),
	makeSubscription({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d580',
		planId: 'plan_002',
		paymentMethod: 'CARD',
		card: {
			token: 'tok_card_002',
			number: '5500 ********** 55',
			holderName: 'Bob Smith',
			expirationDate: '11/26',
		},
		status: 'ACTIVE',
	}),
	makeSubscription({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
		planId: 'plan_003',
		paymentMethod: 'PIX',
		payer: {
			name: 'Carol White',
			email: 'carol.white@example.com',
			phone: {
				iso: 'BR',
				ddi: '+55',
				number: '21988888888',
			},
			document: {
				type: 'INDIVIDUAL',
				number: '98765432100',
			},
			address: {
				state: 'RJ',
				city: 'Rio de Janeiro',
				zipCode: '20040-020',
				neighborhood: 'Centro',
				street: 'Avenida Rio Branco',
				number: '156',
				complement: null,
				landmark: null,
			},
		},
		status: 'OVERDUE',
	}),
	makeSubscription({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d582',
		planId: 'plan_004',
		paymentMethod: 'BOLETO',
		payer: {
			name: 'David Lee',
			email: 'david.lee@example.com',
			phone: {
				iso: 'BR',
				ddi: '+55',
				number: '31977777777',
			},
			document: {
				type: 'COMPANY',
				number: '12345678000199',
			},
			address: {
				state: 'MG',
				city: 'Belo Horizonte',
				zipCode: '30130-010',
				neighborhood: 'Centro',
				street: 'Rua da Bahia',
				number: '1234',
				complement: null,
				landmark: null,
			},
		},
		status: 'ACTIVE',
	}),
	makeSubscription({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d583',
		planId: 'plan_005',
		paymentMethod: 'CARD',
		card: {
			token: 'tok_card_003',
			number: '3782 ********** 06',
			holderName: 'Eve Black',
			expirationDate: '10/28',
		},
		status: 'CANCELED',
		canceledAt: new Date(),
	}),
	makeSubscription({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d584',
		planId: 'plan_006',
		paymentMethod: 'PIX',
		payer: {
			name: 'Frank Green',
			email: 'frank.green@example.com',
			phone: {
				iso: 'BR',
				ddi: '+55',
				number: '85966666666',
			},
			document: {
				type: 'INDIVIDUAL',
				number: '11122233344',
			},
			address: {
				state: 'CE',
				city: 'Fortaleza',
				zipCode: '60060-440',
				neighborhood: 'Centro',
				street: 'Rua Major Facundo',
				number: '500',
				complement: null,
				landmark: null,
			},
		},
		status: 'TRIAL',
	}),
	makeSubscription({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d585',
		planId: 'plan_007',
		paymentMethod: 'BOLETO',
		payer: {
			name: 'Grace Brown',
			email: 'grace.brown@example.com',
			phone: {
				iso: 'BR',
				ddi: '+55',
				number: '48955555555',
			},
			document: {
				type: 'COMPANY',
				number: '98765432000188',
			},
			address: {
				state: 'SC',
				city: 'Florianópolis',
				zipCode: '88010-400',
				neighborhood: 'Centro',
				street: 'Rua Felipe Schmidt',
				number: '303',
				complement: null,
				landmark: null,
			},
		},
		status: 'OVERDUE',
	}),
]
