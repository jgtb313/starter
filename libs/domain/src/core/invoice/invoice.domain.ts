import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import { InvoiceSchema, Invoice, InvoiceInput, InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

export class InvoiceDomain extends BaseDomain<Invoice, InvoiceInput> {
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

  markAsPaid() {
    this.checkIfCanBePaid()

    this.state.paidAt = new Date()
    this.state.status = InvoiceStatusEnum.PAID
  }

  markAsOverdue() {
    this.checkIfCanBeOverdue()

    this.state.overdueAt = new Date()
    this.state.status = InvoiceStatusEnum.OVERDUE
  }

  markAsCanceled() {
    this.checkIfCanBeCanceled()

    this.state.canceledAt = new Date()
    this.state.status = InvoiceStatusEnum.CANCELED
  }

  private checkIfCanBePaid() {
    if (!this.isPending()) {
      throw new ConflictException(`This invoice can’t be paid in its current status.`)
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
      throw new ConflictException(`Only pending invoices can be marked as overdue.`)
    }
  }
}
