import { drawer } from '@ss/components'

import { InventoryDetailsDrawer } from './InventoryDetailsDrawer'
import { InventoryDetailsDrawerProps } from './InventoryDetailsDrawer.types'

export const inventoryDetailsDrawer = {
  open: (props: InventoryDetailsDrawerProps) => {
    drawer.open({
      id: 'InventoryDetailsDrawer',
      padding: false,
      children: <InventoryDetailsDrawer {...props} />
    })
  },
  close: () => drawer.close('InventoryDetailsDrawer')
}
