import { Flex, Badge } from '@ss/components'

import { getDeliveryInvoicesNumber } from '~/support/deliveryProduct'
import { DeliveryInvoicesProps } from './DeliveryInvoices.types'

export const DeliveryInvoices = ({ delivery }: DeliveryInvoicesProps) => {
  const invoiceNumbers = getDeliveryInvoicesNumber(delivery)

  return (
    <Flex gap={8}>
      {invoiceNumbers.map((invoiceNumber) => (
        <Badge key={invoiceNumber}>{invoiceNumber}</Badge>
      ))}
    </Flex>
  )
}
