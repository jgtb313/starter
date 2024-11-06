import { Delivery, DeliveryProduct } from '@ss/schema'
import { addDays, isBefore } from '@ss/shared'

export const getDeliveryInvoicesNumber = ({ deliveryProducts }: Delivery) => {
  return [...new Set(deliveryProducts.map((deliveryProduct) => deliveryProduct.invoice?.number).filter((number) => !!number))] as unknown as string[]
}

export const deliveryProductIsOutOfValidity = (deliveryProduct: DeliveryProduct) => {
  if (!deliveryProduct.validity) {
    return false
  }

  const validityThreshold = addDays(new Date(), 30)

  return isBefore(new Date(deliveryProduct.validity), validityThreshold)
}
