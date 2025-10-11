import { describe, expect, it } from 'vitest'

import { makeInvoice } from '@/core/invoice/invoice.mock'

describe('InvoiceDomain', () => {
	it('should render domain correctly', () => {
		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'CARD',
			card: {
				token: 'tok_001',
				number: '4111 ********** 11',
				holderName: 'Alice Smith',
				expirationDate: '12/27',
			},
			status: 'PAID',
		})

		expect(invoice.state).toBeDefined()
	})
})
