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

	checkIfCanPay() {
		if (this.isPaid()) {
			throw new ConflictException(this.i18nService.current.invoiceAlreadyPaid())
		}
		if (this.isCanceled()) {
			throw new ConflictException(
				this.i18nService.current.invoiceAlreadyCanceled(),
			)
		}
	}

	checkIfCanCancel() {
		if (this.isCanceled()) {
			throw new ConflictException(
				this.i18nService.current.invoiceAlreadyCanceled(),
			)
		}
		if (this.isPaid()) {
			throw new ConflictException(this.i18nService.current.invoiceAlreadyPaid())
		}
	}

	checkIfCanMarkAsOverdue() {
		if (this.isOverdue()) {
			throw new ConflictException(
				this.i18nService.current.invoiceAlreadyOverdue(),
			)
		}
		if (this.isPaid()) {
			throw new ConflictException(this.i18nService.current.invoiceAlreadyPaid())
		}
		if (this.isCanceled()) {
			throw new ConflictException(
				this.i18nService.current.invoiceAlreadyCanceled(),
			)
		}
	}
}
