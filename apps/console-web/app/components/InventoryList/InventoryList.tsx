import { Inventory } from '@ss/schema'
import { Table, confirm, TableHeader } from '@ss/components'
import { formatDate } from '@ss/shared'

import { generateXLSX } from '~/support/xlsx'
import { useInventory } from '~/stores'
import { inventoryDetailsDrawer } from '../InventoryDetailsDrawer'
import { InventoryListProps } from './InventoryList.types'

export const InventoryList = ({ value, total, onDelete, ...props }: InventoryListProps) => {
  const { deleteInventory } = useInventory()

  const headers: TableHeader<Inventory> = [
    {
      key: 'store',
      label: 'Loja',
      selector: ({ store }) => store.name,
      width: 150,
      sorter: false
    },
    {
      key: 'date',
      label: 'Data',
      selector: ({ date }) => formatDate(date),
      width: 150,
      sorter: false
    },
    {
      key: 'createdBy.name',
      label: 'Realizado por',
      selector: ({ createdBy }) => createdBy.name,
      width: 150,
      sorter: false
    },
    {
      key: 'actions',
      selector: (inventory) => [
        {
          key: 'details',
          type: 'button',
          icon: 'Eye',
          label: 'Detalhes',
          onClick: () => inventoryDetailsDrawer.open({ inventory })
        },
        {
          key: 'details',
          type: 'button',
          icon: 'Download',
          label: 'Importar',
          onClick: () => {
            const data = inventory.inventoryProducts.map((inventoryProduct) => ({
              'Código da Loja': inventory.store.rcky,
              'Código do Produto': inventoryProduct.product.code,
              'Qnt. Inventaraida': inventoryProduct.unities,
              'Descrição do Produto': inventoryProduct.product.name
            }))

            generateXLSX(data, `${inventory.store.name.toLowerCase()}_inventário_${formatDate(inventory.date)}`)
          }
        },
        {
          key: 'delete',
          type: 'button',
          icon: 'Trash2',
          label: 'Excluír',
          onClick: () =>
            confirm({
              title: 'Excluir inventário',
              description: `Você tem certeza que deseja excluir o inventário realizado no dia ${formatDate(inventory.date)}?`,
              onConfirm: () => deleteInventory(inventory, { onSuccess: onDelete })
            })
        }
      ]
    }
  ]

  return <Table {...props} value={{ total, ...value }} headers={headers} />
}
