import { useState } from 'react'
import { Tabs, Flex, Typography } from '@ss/components'
import { formatDate } from '@ss/shared'

import { deliveryProductIsOutOfValidity } from '~/support/deliveryProduct'
import { Details } from '~/common'
import { DeliveryInvoices } from '../DeliveryInvoices'
import { DeliveryDetailsProps, DeliveryDetailsTabProps } from './DeliveryDetails.types'

const Informations = ({ delivery }: DeliveryDetailsTabProps) => {
  return (
    <Details
      items={[
        {
          label: 'Loja',
          value: delivery.store.name
        },
        {
          label: 'Data',
          value: formatDate(delivery.date)
        },
        {
          label: 'Notas',
          value: <DeliveryInvoices delivery={delivery} />
        },
        {
          label: 'Realizada por',
          value: delivery.createdBy.name
        }
      ]}
    />
  )
}

const Product = ({ delivery }: DeliveryDetailsTabProps) => {
  return (
    <Details
      items={delivery.deliveryProducts.map((deliveryProduct) => ({
        label: deliveryProduct.product.name,
        value: (
          <Flex direction="column">
            <Typography size="md" c="dimmed">
              {deliveryProduct.invoice ? `Nota: ${deliveryProduct.invoice.number}` : 'Fora da entrega'}
            </Typography>

            <Typography size="md" c="dimmed">
              Código: {deliveryProduct.product.code}
            </Typography>

            <Typography size="md" c="dimmed">
              Lote: {deliveryProduct.lot ?? 'Não informado'}
            </Typography>

            <Typography size="md">
              Validade:{' '}
              <Typography size="md" c={deliveryProduct.validity ? (deliveryProductIsOutOfValidity(deliveryProduct) ? 'red' : 'green') : 'dimmed'}>
                {deliveryProduct.validity ? formatDate(deliveryProduct.validity) : 'Não informado'}
              </Typography>
            </Typography>

            <Typography size="md" c="dimmed">
              Caixas: {deliveryProduct.invoiceProduct ? `${deliveryProduct.boxes}/${deliveryProduct.invoiceProduct.boxes}` : deliveryProduct.boxes}
            </Typography>
          </Flex>
        )
      }))}
    />
  )
}

export const DeliveryDetails = ({ delivery }: DeliveryDetailsProps) => {
  const [tab, setTab] = useState('informations')

  return (
    <Tabs
      value={tab}
      items={[
        {
          value: 'informations',
          label: 'Informações',
          icon: 'NotepadText',
          children: <Informations delivery={delivery} />
        },
        {
          value: 'products',
          label: 'Produtos',
          icon: 'Package',
          children: <Product delivery={delivery} />
        }
      ]}
      onChange={setTab}
      padding
      grow
      fixed
    />
  )
}
