import { drawer } from '@ss/components'

import { DeliveryDetailsDrawer } from './DeliveryDetailsDrawer'
import { DeliveryDetailsDrawerProps } from './DeliveryDetailsDrawer.types'

export const deliveryDetailsDrawer = {
  open: (props: DeliveryDetailsDrawerProps) => {
    drawer.open({
      id: 'DeliveryDetailsDrawer',
      padding: false,
      children: <DeliveryDetailsDrawer {...props} />
    })
  },
  close: () => drawer.close('DeliveryDetails')
}
