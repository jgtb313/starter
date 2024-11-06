import { drawer } from '@ss/components'

import { StoreFormDrawer } from './StoreFormDrawer'
import { StoreFormDrawerProps } from './StoreFormDrawer.types'

export const storeFormDrawer = {
  open: <T extends {}>(props: StoreFormDrawerProps<T>) => {
    drawer.open({
      id: 'StoreFormDrawer',
      children: <StoreFormDrawer {...props} />,
      padding: true
    })
  },
  close: () => drawer.close('StoreFormDrawer')
}
