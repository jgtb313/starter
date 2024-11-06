import { useState } from 'react'
import { Drawer, Tabs, Flex, Typography } from '@ss/components'
import { formatDate } from '@ss/shared'

import { Details } from '~/common'
import { InventoryDetailsProps, InventoryDetailsTabProps } from './InventoryDetails.types'

const Informations = ({ inventory }: InventoryDetailsTabProps) => {
  return (
    <Details
      items={[
        {
          label: 'Loja',
          value: inventory.store.name
        },
        {
          label: 'Data',
          value: formatDate(inventory.date)
        },
        {
          label: 'Realizado por',
          value: inventory.createdBy.name
        }
      ]}
    />
  )
}

const Product = ({ inventory }: InventoryDetailsTabProps) => {
  return (
    <Details
      items={inventory.inventoryProducts.map((inventoryProduct) => ({
        label: inventoryProduct.product.name,
        value: (
          <Flex direction="column">
            <Typography size="md" c="dimmed">
              Código: {inventoryProduct.product.code}
            </Typography>

            <Typography size="md" c="dimmed">
              Unidades: {inventoryProduct.unities}
            </Typography>
          </Flex>
        )
      }))}
    />
  )
}

export const InventoryDetails = ({ inventory }: InventoryDetailsProps) => {
  const [tab, setTab] = useState('informations')

  return (
    <Drawer.Content>
      <Drawer.Header>Inventário • {formatDate(inventory.date)}</Drawer.Header>

      <Drawer.Body>
        <Tabs
          value={tab}
          items={[
            {
              value: 'informations',
              label: 'Informações',
              icon: 'NotepadText',
              children: <Informations inventory={inventory} />
            },
            {
              value: 'products',
              label: 'Produtos',
              icon: 'Package',
              children: <Product inventory={inventory} />
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
