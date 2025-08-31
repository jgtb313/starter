import { ConflictException } from '@starter/nestjs-error-handling'
import { describe, expect, it } from 'vitest'

import { makeInvoice } from '@/core/invoice/invoice.mock'

describe('InvoiceDomain', () => {
	it('should identify status correctly', () => {
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

		expect(invoice.isPaid()).toBe(true)
		expect(invoice.isPending()).toBe(false)
		expect(invoice.isOverdue()).toBe(false)
		expect(invoice.isCanceled()).toBe(false)
	})

	it('should allow marking invoice as paid if pending', () => {
		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'PIX',
			pix: {
				qrCodeUrl: 'https://pix.example.com/qrcode',
				expiresAt: new Date().toISOString(),
			},
			status: 'PENDING',
		})

		invoice.markAsPaid()

		expect(invoice.isPaid()).toBe(true)
		expect(invoice.state.paidAt).toBeInstanceOf(Date)
	})

	it('should throw when marking as paid if not pending', () => {
		const status = 'CANCELED'

		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'BOLETO',
			boleto: {
				url: 'https://boleto.example.com/123',
				expiresAt: new Date().toISOString(),
			},
			status,
		})

		expect(() => invoice.markAsPaid()).toThrowError(
			new ConflictException(
				`This invoice can’t be paid in its current status.`,
			),
		)
	})

	it('should allow marking invoice as overdue if pending', () => {
		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'CARD',
			card: {
				token: 'tok_002',
				number: '4111 ********** 11',
				holderName: 'Bob Brown',
				expirationDate: '10/28',
			},
			status: 'PENDING',
		})

		invoice.markAsOverdue()

		expect(invoice.isOverdue()).toBe(true)
		expect(invoice.state.overdueAt).toBeInstanceOf(Date)
	})

	it('should throw when marking as overdue if not pending', () => {
		const status = 'PAID'

		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'CARD',
			card: {
				token: 'tok_003',
				number: '4111 ********** 11',
				holderName: 'Clara White',
				expirationDate: '08/30',
			},
			status,
		})

		expect(() => invoice.markAsOverdue()).toThrowError(
			new ConflictException(`Only pending invoices can be marked as overdue.`),
		)
	})

	it('should allow marking as canceled when not already canceled or paid', () => {
		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'PIX',
			pix: {
				qrCodeUrl: 'https://pix.example.com/qrcode',
				expiresAt: new Date().toISOString(),
			},
			status: 'PENDING',
		})

		invoice.markAsCanceled()

		expect(invoice.isCanceled()).toBe(true)
		expect(invoice.state.canceledAt).toBeInstanceOf(Date)
	})

	it('should throw when marking as canceled if already canceled', () => {
		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'PIX',
			pix: {
				qrCodeUrl: 'https://pix.example.com/qrcode',
				expiresAt: new Date().toISOString(),
			},
			status: 'CANCELED',
		})

		expect(() => invoice.markAsCanceled()).toThrowError(
			new ConflictException(`This invoice is already canceled.`),
		)
	})

	it('should throw when marking as canceled if already paid', () => {
		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'PIX',
			pix: {
				qrCodeUrl: 'https://pix.example.com/qrcode',
				expiresAt: new Date().toISOString(),
			},
			status: 'PAID',
		})

		expect(() => invoice.markAsCanceled()).toThrowError(
			new ConflictException(`Paid invoices cannot be canceled.`),
		)
	})

	it('should throw if trying to mark a non-pending invoice as paid', () => {
		const invoice = makeInvoice({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			subscriptionId: '126b6b16-0238-41bc-9c27-54f260b08aaa',
			paymentMethod: 'BOLETO',
			boleto: {
				url: 'https://boleto.example.com/123',
				expiresAt: new Date().toISOString(),
			},
			status: 'OVERDUE',
		})

		expect(() => invoice.markAsPaid()).toThrowError(
			new ConflictException(
				`This invoice can’t be paid in its current status.`,
			),
		)
	})
})
