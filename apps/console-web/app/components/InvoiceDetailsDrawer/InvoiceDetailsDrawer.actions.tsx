import { drawer } from '@ss/components'

import { InvoiceDetailsDrawer } from './InvoiceDetailsDrawer'
import { InvoiceDetailsDrawerProps } from './InvoiceDetailsDrawer.types'

export const invoiceDetailsDrawer = {
  open: (props: InvoiceDetailsDrawerProps) => {
    drawer.open({
      id: 'InvoiceDetailsDrawer',
      padding: false,
      children: <InvoiceDetailsDrawer {...props} />
    })
  },
  close: () => drawer.close('InvoiceDetailsDrawer')
}
