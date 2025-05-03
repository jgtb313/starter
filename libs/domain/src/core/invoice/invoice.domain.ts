import { ConflictException } from '@starter/nestjs-error-handling'
import { z } from '@starter/schema'

import { BaseDomain } from '@/support/base-domain'
import { InvoiceSchema, Invoice, InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

type InvoiceInput = z.input<typeof InvoiceSchema>

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

  isPayable() {
    return this.isPending()
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
