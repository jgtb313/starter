import { drawer, DrawerActions } from '@ss/components'

import { BatchInvoiceFormDrawer } from './BatchInvoiceFormDrawer'
import { BatchInvoiceFormDrawerProps } from './BatchInvoiceFormDrawer.types'

export const batchInvoiceFormDrawer: DrawerActions<BatchInvoiceFormDrawerProps> = {
  open: (props) => {
    drawer.open({
      id: 'BatchInvoiceFormDrawer',
      children: <BatchInvoiceFormDrawer {...props} />,
      padding: true
    })
  },
  close: () => drawer.close('BatchInvoiceFormDrawer')
}
