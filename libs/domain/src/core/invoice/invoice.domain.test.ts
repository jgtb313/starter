import { describe, it, expect } from 'vitest'
import { ConflictException } from '@starter/nestjs-error-handling'

import { RecurrencePaymentMethodEnum } from '@/ports/recurrence'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import { Invoice, InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

const makeInvoice = (overrides: Partial<Invoice>): Invoice => ({
  invoiceId: 'inv_test_id',
  workspaceId: 'ws_test_id',
  subscriptionId: 'sub_test_id',
  externalId: 'ext_test_id',
  description: 'Test invoice description',
  amount: 10000,
  paymentMethod: RecurrencePaymentMethodEnum.CREDIT_CARD,
  creditCard: {
    holderName: '',
    number: '',
    expirationDate: '',
  },
  dueDate: new Date('2025-05-01T00:00:00Z'),
  issuedAt: new Date('2025-04-01T00:00:00Z'),
  canceledAt: null,
  status: InvoiceStatusEnum.PENDING,
  createdAt: new Date('2025-04-01T00:00:00Z'),
  updatedAt: new Date('2025-04-01T00:00:00Z'),
})

describe('InvoiceDomain', () => {
  it('should identify status correctly', () => {
    const invoice = new InvoiceDomain(makeInvoice({ status: InvoiceStatusEnum.PAID }))
    expect(invoice.isPaid()).toBe(true)
    expect(invoice.isPending()).toBe(false)
    expect(invoice.isOverdue()).toBe(false)
    expect(invoice.isCanceled()).toBe(false)
  })

  it('should mark as paid when status is pending', () => {
    const invoice = new InvoiceDomain(makeInvoice({}))
    invoice.markAsPaid()
    expect(invoice.state.status).toBe(InvoiceStatusEnum.PAID)
  })

  it('should throw when marking as paid if not pending', () => {
    const invoice = new InvoiceDomain(makeInvoice({ status: InvoiceStatusEnum.CANCELED }))
    expect(() => invoice.markAsPaid()).toThrowError(ConflictException)
  })

  it('should mark as overdue when status is pending', () => {
    const invoice = new InvoiceDomain(makeInvoice({}))
    invoice.markAsOverdue()
    expect(invoice.state.status).toBe(InvoiceStatusEnum.OVERDUE)
  })

  it('should throw when marking as overdue if not pending', () => {
    const invoice = new InvoiceDomain(makeInvoice({ status: InvoiceStatusEnum.PAID }))
    expect(() => invoice.markAsOverdue()).toThrowError(ConflictException)
  })

  it('should mark as canceled if not already canceled', () => {
    const invoice = new InvoiceDomain(makeInvoice({}))
    invoice.markAsCanceled()
    expect(invoice.state.status).toBe(InvoiceStatusEnum.CANCELED)
    expect(invoice.state.canceledAt).toBeInstanceOf(Date)
  })

  it('should throw when marking as canceled if already canceled', () => {
    const invoice = new InvoiceDomain(makeInvoice({ status: InvoiceStatusEnum.CANCELED }))
    expect(() => invoice.markAsCanceled()).toThrowError(ConflictException)
  })

  it('should allow checkIfIsPayable if invoice is payable', () => {
    const invoice = new InvoiceDomain(makeInvoice({ status: InvoiceStatusEnum.PAID }))
    expect(() => invoice.checkIfIsPayable()).not.toThrow()
  })

  it('should throw on checkIfIsPayable if status is pending', () => {
    const invoice = new InvoiceDomain(makeInvoice({ status: InvoiceStatusEnum.PENDING }))
    expect(() => invoice.checkIfIsPayable()).toThrowError(ConflictException)
  })
})
