import { uuid } from '@starter/common'
import type { BaseBoleto, BasePaymentCard, BasePix } from '@starter/schema'

import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import type { InvoiceInput } from '@/core/invoice/invoice.schema'

type InvoiceOverrides =
	| (Partial<Omit<InvoiceInput, 'workspaceId' | 'subscriptionId'>> &
			Pick<InvoiceInput, 'workspaceId' | 'subscriptionId'> & {
				paymentMethod: 'CARD'
				card: BasePaymentCard
			})
	| (Partial<Omit<InvoiceInput, 'workspaceId' | 'subscriptionId'>> &
			Pick<InvoiceInput, 'workspaceId' | 'subscriptionId'> & {
				paymentMethod: 'PIX'
				pix: BasePix
			})
	| (Partial<Omit<InvoiceInput, 'workspaceId' | 'subscriptionId'>> &
			Pick<InvoiceInput, 'workspaceId' | 'subscriptionId'> & {
				paymentMethod: 'BOLETO'
				boleto: BaseBoleto
			})

export const makeInvoice = (overrides: InvoiceOverrides): InvoiceDomain => {
	const base: Omit<
		InvoiceInput,
		'workspaceId' | 'subscriptionId' | 'paymentMethod'
	> = {
		invoiceId: uuid(),
		externalId: uuid(),
		description: 'Invoice Subscription – January / 2025',
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
	})
}

export const invoiceMocks: InvoiceDomain[] = [
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
		paymentMethod: 'CARD',
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
		card: {
			token: 'tok_002',
			number: '5500 ********** 55',
			holderName: 'Bob Johnson',
			expirationDate: '11/26',
		},
		status: 'PAID',
		paidAt: new Date('2025-04-10T12:00:00Z').toISOString(),
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d580',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aac',
		paymentMethod: 'PIX',
		pix: {
			qrCodeUrl: 'https://pix.example.com/v2/abc123',
			expiresAt: new Date('2025-05-01T23:59:59Z').toISOString(),
		},
		status: 'OVERDUE',
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aad',
		paymentMethod: 'PIX',
		pix: {
			qrCodeUrl: 'https://pix.example.com/v2/def456',
			expiresAt: new Date('2025-06-01T23:59:59Z').toISOString(),
		},
		status: 'CANCELED',
		canceledAt: new Date('2025-04-15T15:00:00Z').toISOString(),
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d582',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aae',
		paymentMethod: 'BOLETO',
		boleto: {
			url: 'https://boleto.example.com/123',
			expiresAt: new Date('2025-05-01T23:59:59Z').toISOString(),
		},
		status: 'PENDING',
	}),
	makeInvoice({
		workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d583',
		subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaf',
		paymentMethod: 'BOLETO',
		boleto: {
			url: 'https://boleto.example.com/456',
			expiresAt: new Date('2025-05-01T23:59:59Z').toISOString(),
		},
		status: 'PAID',
		paidAt: new Date('2025-04-08T09:30:00Z').toISOString(),
	}),
]
