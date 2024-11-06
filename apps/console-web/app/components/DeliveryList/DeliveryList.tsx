import { Delivery } from '@ss/schema'
import { Table, confirm, TableHeader } from '@ss/components'
import { formatDate } from '@ss/shared'

import { useDelivery } from '~/stores'
import { DeliveryInvoices } from '../DeliveryInvoices'
import { deliveryDetailsDrawer } from '../DeliveryDetailsDrawer'
import { DeliveryListProps } from './DeliveryList.types'

export const DeliveryList = ({ value, total, onDelete, ...props }: DeliveryListProps) => {
  const { deleteDelivery } = useDelivery()

  const headers: TableHeader<Delivery> = [
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
      key: 'invoices',
      label: 'Notas',
      selector: (delivery) => <DeliveryInvoices delivery={delivery} />,
      width: 150,
      sorter: false
    },
    {
      key: 'createdBy.name',
      label: 'Realizada por',
      selector: ({ createdBy }) => createdBy.name,
      width: 150,
      sorter: false
    },
    {
      key: 'actions',
      selector: (delivery) => [
        {
          key: 'details',
          type: 'button',
          icon: 'Eye',
          label: 'Detalhes',
          onClick: () => deliveryDetailsDrawer.open({ delivery })
        },
        {
          key: 'delete',
          type: 'button',
          icon: 'Trash2',
          label: 'Excluír',
          onClick: () =>
            confirm({
              title: 'Excluir entrega',
              description: `Você tem certeza que deseja excluir a entrega realizada no dia ${formatDate(delivery.date)}?`,
              onConfirm: () => deleteDelivery(delivery, { onSuccess: onDelete })
            })
        }
      ]
    }
  ]

  return <Table {...props} value={{ total, ...value }} headers={headers} />
}
