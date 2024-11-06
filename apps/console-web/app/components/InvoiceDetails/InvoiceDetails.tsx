import { useState } from 'react'
import { Drawer, Tabs, Badge, Flex, Typography } from '@ss/components'
import { formatToBRL, formatDate } from '@ss/shared'

import { invoiceProductIsOutOfValidity } from '~/support/invoiceProduct'
import { Details } from '~/common'
import { InvoiceDetailsProps, InvoiceDetailsTabProps } from './InvoiceDetails.types'

const Informations = ({ invoice }: InvoiceDetailsTabProps) => {
  return (
    <Details
      items={[
        {
          label: 'Loja',
          value: invoice.store.name
        },
        {
          label: 'Número',
          value: invoice.number
        },
        {
          label: 'Qtde de caixas',
          value: invoice.boxes
        },
        {
          label: 'Valor',
          value: invoice.value ? formatToBRL(invoice.value) : '-'
        },
        {
          label: 'ICMS',
          value: invoice.icms ?? '-'
        },
        {
          label: 'IPI',
          value: invoice.ipi ?? '-'
        },
        {
          label: 'PIS',
          value: invoice.pis ?? '-'
        },
        {
          label: 'Entregue',
          value: <Badge color={invoice.delivered ? 'green' : 'red'}>{invoice.delivered ? 'Sim' : 'Não'}</Badge>
        }
      ]}
    />
  )
}

const Product = ({ invoice }: InvoiceDetailsTabProps) => {
  return (
    <Details
      items={invoice.invoiceProducts.map((invoiceProduct) => ({
        label: invoiceProduct.product.name,
        value: (
          <Flex direction="column">
            <Typography size="md" c="dimmed">
              Código: {invoiceProduct.product.code}
            </Typography>

            <Typography size="md" c="dimmed">
              Caixas: {invoiceProduct.boxes}
            </Typography>

            <Typography size="md" c="dimmed">
              Lote: {invoiceProduct.lot ?? '-'}
            </Typography>

            <Typography size="md">
              Validade:{' '}
              <Typography size="md" c={invoiceProduct.validity ? (invoiceProductIsOutOfValidity(invoiceProduct) ? 'red' : 'green') : 'dimmed'}>
                {invoiceProduct.validity ? formatDate(invoiceProduct.validity) : '-'}
              </Typography>
            </Typography>
          </Flex>
        )
      }))}
    />
  )
}

export const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  const [tab, setTab] = useState('informations')

  return (
    <Drawer.Content>
      <Drawer.Header>Nota {invoice.number}</Drawer.Header>

      <Drawer.Body>
        <Tabs
          value={tab}
          items={[
            {
              value: 'informations',
              label: 'Informações',
              icon: 'NotepadText',
              children: <Informations invoice={invoice} />
            },
            {
              value: 'products',
              label: 'Produtos',
              icon: 'Package',
              children: <Product invoice={invoice} />
            }
          ]}
          onChange={setTab}
          padding
          grow
          fixed
        />
      </Drawer.Body>
    </Drawer.Content>
  )
}
