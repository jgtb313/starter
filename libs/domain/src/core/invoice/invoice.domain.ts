import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import { InvoiceSchema, Invoice, InvoiceInput, InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

export class InvoiceDomain extends BaseDomain<Invoice, InvoiceInput> {
  private PAYABLE_STATUSES: InvoiceStatusEnum[] = [InvoiceStatusEnum.PENDING]

  constructor(invoice: InvoiceInput) {
    super(InvoiceSchema, invoice)
  }

  isPending() {
    return this.state.status === InvoiceStatusEnum.PENDING
  }

  isPaid() {
    return this.state.status === InvoiceStatusEnum.PAID
  }

  isOverdue() {
    return this.state.status === InvoiceStatusEnum.OVERDUE
  }

  isCanceled() {
    return this.state.status === InvoiceStatusEnum.CANCELED
  }

  isPayable() {
    return this.PAYABLE_STATUSES.includes(this.state.status)
  }

  markAsPaid() {
    if (!this.isPending()) {
      throw new ConflictException(`Unable to mark invoice ${this.state.invoiceId} as paid: status must be 'PENDING', but is '${this.state.status}'.`)
    }

    this.state.status = InvoiceStatusEnum.PAID
  }

  markAsOverdue() {
    if (!this.isPending()) {
      throw new ConflictException(
        `Unable to mark invoice ${this.state.invoiceId} as overdue: status must be 'PENDING', but is '${this.state.status}'.`,
      )
    }

    this.state.status = InvoiceStatusEnum.OVERDUE
  }

  markAsCanceled() {
    if (this.isCanceled()) {
      throw new ConflictException(`Invoice ${this.state.invoiceId} is already canceled.`)
    }

    this.state.status = InvoiceStatusEnum.CANCELED
    this.state.canceledAt = new Date()
  }

  checkIfIsPayable() {
    if (!this.isPayable()) {
      throw new ConflictException(`Invoice ${this.state.invoiceId} cannot be paid: status '${this.state.status}' is not valid for payment.`)
    }
  }
}
