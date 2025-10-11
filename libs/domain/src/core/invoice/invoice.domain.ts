import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import { type Invoice, InvoiceSchema } from '@/core/invoice/invoice.schema'

export class InvoiceDomain extends BaseDomain<Invoice> {
	constructor(invoice: Invoice) {
		super(InvoiceSchema, invoice)
	}

	isPending() {
		return this.state.status === 'PENDING'
	}

	isPaid() {
		return this.state.status === 'PAID'
	}

	isOverdue() {
		return this.state.status === 'OVERDUE'
	}

	isCanceled() {
		return this.state.status === 'CANCELED'
	}

	private checkIfCanBePaid() {
		if (!this.isPending()) {
			throw new ConflictException(
				`This invoice can’t be paid in its current status.`,
			)
		}
	}

	private checkIfCanBeCanceled() {
		if (this.isCanceled()) {
			throw new ConflictException(`This invoice is already canceled.`)
		}

		if (this.isPaid()) {
			throw new ConflictException(`Paid invoices cannot be canceled.`)
		}
	}

	private checkIfCanBeOverdue() {
		if (!this.isPending()) {
			throw new ConflictException(
				`Only pending invoices can be marked as overdue.`,
			)
		}
	}
}
