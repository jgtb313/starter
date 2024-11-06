import { Drawer } from '@ss/components'
import { formatDate } from '@ss/shared'

import { InventoryDetails } from '../InventoryDetails'
import { InventoryDetailsDrawerProps } from './InventoryDetailsDrawer.types'

export const InventoryDetailsDrawer = ({ inventory }: InventoryDetailsDrawerProps) => {
  return (
    <Drawer.Content>
      <Drawer.Header>Inventário • {formatDate(inventory.date)}</Drawer.Header>

      <Drawer.Body>
        <InventoryDetails inventory={inventory} />
      </Drawer.Body>
    </Drawer.Content>
  )
}
