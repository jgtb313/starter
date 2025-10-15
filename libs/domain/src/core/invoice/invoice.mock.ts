import { uuid } from '@starter/common'

import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import type {
	Invoice,
	InvoiceBoleto,
	InvoiceCard,
	InvoicePix,
} from '@/core/invoice/invoice.schema'

type InvoiceOverrides =
	| Partial<InvoiceCard>
	| Partial<InvoicePix>
	| Partial<InvoiceBoleto>

export const makeInvoice = (overrides: InvoiceOverrides): InvoiceDomain => {
	const base: Invoice = {
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
		dueDate: new Date(),
		issuedAt: new Date(),
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
	} as Invoice)
}

export const invoiceMocks: InvoiceDomain[] = [
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
		paymentMethod: 'CARD',
		description: 'Invoice Subscription Pro Plan – March / 2025',
		amount: 9900,
		card: {
			token: 'tok_001',
			number: '4111 ********** 11',
			holderName: 'Alice Smith',
			expirationDate: '12/27',
		},
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aab',
		paymentMethod: 'CARD',
		description: 'Invoice Subscription Starter Plan – April / 2025',
		amount: 2900,
		card: {
			token: 'tok_002',
			number: '5500 ********** 55',
			holderName: 'Bob Johnson',
			expirationDate: '11/26',
		},
		status: 'PAID',
		paidAt: new Date('2025-04-10T12:00:00Z'),
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d580',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aac',
		paymentMethod: 'PIX',
		amount: 5900,
		pix: {
			qrCodeUrl: 'https://pix.example.com/v2/abc123',
			expiresAt: new Date('2025-05-01T23:59:59Z'),
		},
		status: 'OVERDUE',
		overdueAt: new Date('2025-04-25T00:00:00Z'),
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aad',
		paymentMethod: 'PIX',
		amount: 9900,
		pix: {
			qrCodeUrl: 'https://pix.example.com/v2/def456',
			expiresAt: new Date('2025-06-01T23:59:59Z'),
		},
		status: 'CANCELED',
		canceledAt: new Date('2025-04-15T15:00:00Z'),
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d582',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aae',
		paymentMethod: 'BOLETO',
		amount: 12900,
		boleto: {
			url: 'https://boleto.example.com/123',
			expiresAt: new Date('2025-05-01T23:59:59Z'),
		},
		status: 'PENDING',
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d583',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaf',
		paymentMethod: 'BOLETO',
		amount: 19900,
		boleto: {
			url: 'https://boleto.example.com/456',
			expiresAt: new Date('2025-05-01T23:59:59Z'),
		},
		status: 'PAID',
		paidAt: new Date('2025-04-08T09:30:00Z'),
	}),
]
