import { describe, expect, it } from 'vitest'

import { makeInvoice } from '@/core/invoice/invoice.mock'

describe('InvoiceDomain', () => {
	it('should render domain correctly', () => {
		const invoice = makeInvoice({})

		expect(invoice.state).toBeDefined()
	})
})
