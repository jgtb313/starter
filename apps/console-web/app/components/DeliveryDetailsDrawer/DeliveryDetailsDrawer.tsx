import { Drawer } from '@ss/components'
import { formatDate } from '@ss/shared'

import { DeliveryDetails } from '../DeliveryDetails'
import { DeliveryDetailsDrawerProps } from './DeliveryDetailsDrawer.types'

export const DeliveryDetailsDrawer = ({ delivery }: DeliveryDetailsDrawerProps) => {
  return (
    <Drawer.Content>
      <Drawer.Header>Entrega • {formatDate(delivery.date)}</Drawer.Header>

      <Drawer.Body>
        <DeliveryDetails delivery={delivery} />
      </Drawer.Body>
    </Drawer.Content>
  )
}
