import { Drawer } from '@ss/components'

import { InvoiceDetails } from '../InvoiceDetails'
import { InvoiceDetailsDrawerProps } from './InvoiceDetailsDrawer.types'

export const InvoiceDetailsDrawer = ({ invoice }: InvoiceDetailsDrawerProps) => {
  return (
    <Drawer.Content>
      <Drawer.Header>Nota • {invoice.number}</Drawer.Header>

      <Drawer.Body>
        <InvoiceDetails invoice={invoice} />
      </Drawer.Body>
    </Drawer.Content>
  )
}
