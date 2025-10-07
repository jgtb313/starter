import { Injectable } from '@nestjs/common'
import { uuid } from '@starter/common'

import type { IRecurrenceAdapter } from '@/adapters/recurrence/recurrence.adapter'

@Injectable()
export class InMemoryRecurrenceAdapter implements IRecurrenceAdapter {
	createPlan: IRecurrenceAdapter['createPlan'] = async () => {
		return {
			planId: uuid(),
		}
	}

	updatePlan: IRecurrenceAdapter['updatePlan'] = async () => {
		return
	}

	cancelPlan: IRecurrenceAdapter['cancelPlan'] = async () => {
		return
	}

	createCustmer: IRecurrenceAdapter['createCustmer'] = async () => {
		return {
			customerId: uuid(),
		}
	}

	createSubscription: IRecurrenceAdapter['createSubscription'] = async (
		input,
	) => {
		const subscriptionId = uuid()

		if (input.paymentMethod === 'CARD') {
			return {
				subscriptionId,
				paymentMethod: input.paymentMethod,
				card: {
					token: input.cardToken,
					number: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
					holderName: input.payer.name,
					expirationDate: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${new Date().getFullYear() + 3}`,
				},
			}
		}

		if (input.paymentMethod === 'PIX') {
			return {
				subscriptionId,
				paymentMethod: input.paymentMethod,
				pix: {
					qrCodeUrl:
						'https://pix.example.com/v2/9c1b2841-d993-48a7-bb75-61b460bdbb69',
					expiresAt: new Date(Date.now() + 3600_000).toISOString(),
				},
			}
		}

		return {
			subscriptionId,
			paymentMethod: input.paymentMethod,
			boleto: {
				url: 'https://example.com/boleto.pdf',
				expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
			},
		}
	}

	changeSubscriptionPaymentMethod: IRecurrenceAdapter['changeSubscriptionPaymentMethod'] =
		async ({ subscriptionId, ...input }) => {
			if (input.paymentMethod === 'CARD') {
				return {
					subscriptionId,
					paymentMethod: input.paymentMethod,
					card: {
						token: input.cardToken,
						number: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
						holderName: '',
						expirationDate: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${new Date().getFullYear() + 3}`,
					},
				}
			}

			if (input.paymentMethod === 'PIX') {
				return {
					subscriptionId,
					paymentMethod: input.paymentMethod,
					pix: {
						qrCodeUrl:
							'https://pix.example.com/v2/9c1b2841-d993-48a7-bb75-61b460bdbb69',
						expiresAt: new Date(Date.now() + 3600_000).toISOString(),
					},
				}
			}

			return {
				subscriptionId,
				paymentMethod: input.paymentMethod,
				boleto: {
					url: 'https://example.com/boleto.pdf',
					expiresAt: new Date(
						Date.now() + 3 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
			}
		}

	changeSubscriptionPlan: IRecurrenceAdapter['changeSubscriptionPlan'] =
		async ({ subscriptionId }) => {
			return {
				subscriptionId,
				paymentMethod: 'CARD',
			}
		}

	cancelSubscription: IRecurrenceAdapter['cancelSubscription'] = async () => {
		return
	}
}
