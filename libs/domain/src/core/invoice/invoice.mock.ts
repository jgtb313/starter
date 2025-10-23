import { uuid } from '@starter/common'

import type {
	InvoiceBoleto,
	InvoiceCard,
	InvoiceInput,
	InvoicePix,
} from '@/core/invoice/invoice.schema'

type InvoiceOverrides =
	| Partial<InvoiceCard>
	| Partial<InvoicePix>
	| Partial<InvoiceBoleto>

export const makeInvoice = (overrides: InvoiceOverrides): InvoiceInput => {
	const base: InvoiceInput = {
		workspaceId: uuid(),
		subscriptionId: uuid(),
		planId: uuid(),
		plan: {
			planId: uuid(),
			externalId: uuid(),
			name: 'Basic',
			description: 'Basic plan',
			features: [],
			intervals: [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		invoiceId: uuid(),
		externalId: uuid(),
		description: 'Invoice Subscription – January / 2025',
		paymentMethod: 'CARD',
		card: {
			token: uuid(),
			number: '4111 ********** 11',
			holderName: 'Alice Smith',
			expirationDate: '12/27',
		},
		amount: 10000,
		dueDate: new Date().toISOString(),
		issuedAt: new Date().toISOString(),
		paidAt: null,
		overdueAt: null,
		canceledAt: null,
		status: 'PENDING',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}

	return {
		...base,
		...overrides,
	} as InvoiceInput
}
