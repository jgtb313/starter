import { uuid } from '@starter/common'

import { InvoiceDomain } from '@/core/invoice/invoice.domain'
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

export const makeInvoice = (overrides: InvoiceOverrides): InvoiceDomain => {
	const base: InvoiceInput = {
		workspaceId: uuid(),
		subscriptionId: uuid(),
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

	return new InvoiceDomain({
		...base,
		...overrides,
	} as InvoiceInput)
}

export const invoiceMocks: InvoiceDomain[] = []
