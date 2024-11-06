import { InvoiceProduct } from '@ss/schema'
import { addDays, isBefore } from '@ss/shared'

export const invoiceProductIsOutOfValidity = (invoiceProduct: InvoiceProduct) => {
  if (!invoiceProduct.validity) {
    return false
  }

  const validityThreshold = addDays(new Date(), 30)

  return isBefore(new Date(invoiceProduct.validity), validityThreshold)
}
