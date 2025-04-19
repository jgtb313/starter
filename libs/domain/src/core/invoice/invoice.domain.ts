import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import { InvoiceSchema, Invoice, InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

export class InvoiceDomain extends BaseDomain<Invoice> {
  constructor(invoice: Invoice) {
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

  markAsPaid() {
    if (!this.isPending()) {
      throw new ConflictException(`Invoice ${this.state.invoiceId} cannot be marked as paid because it's not pending`)
    }

    this.state.status = InvoiceStatusEnum.PAID
  }

  markAsOverdue() {
    if (!this.isPending()) {
      throw new ConflictException(`Invoice ${this.state.invoiceId} cannot be marked as overdue because it's not pending`)
    }

    this.state.status = InvoiceStatusEnum.OVERDUE
  }

  markAsCanceled() {
    if (this.isCanceled()) {
      throw new ConflictException(`Invoice ${this.state.invoiceId} is already canceled`)
    }

    this.state.status = InvoiceStatusEnum.CANCELED
    this.state.canceledAt = new Date()
  }

  checkIfIsPayable() {
    if (!this.isPending()) {
      throw new ConflictException(`Invoice ${this.state.invoiceId} cannot be paid because its status is ${this.state.status}`)
    }
  }
}
