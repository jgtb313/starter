import { Invoice } from '@ss/schema'
import { Table, Badge, confirm, TableHeader } from '@ss/components'
import { formatToBRL } from '@ss/shared'

import { useInvoice } from '~/stores'
import { invoiceDetailsDrawer } from '../InvoiceDetailsDrawer'
import { InvoiceListProps } from './InvoiceList.types'

export const InvoiceList = ({ value, total, onDelete, ...props }: InvoiceListProps) => {
  const { deleteInvoice } = useInvoice()

  const headers: TableHeader<Invoice> = [
    {
      key: 'store',
      label: 'Loja',
      selector: ({ store }) => store.name,
      width: 150,
      sorter: false
    },
    {
      key: 'number',
      label: 'Número',
      selector: ({ number }) => number,
      width: 150,
      sorter: false
    },
    {
      key: 'value',
      label: 'Valor',
      selector: ({ value }) => (value ? formatToBRL(value) : '-'),
      width: 150,
      sorter: false
    },
    {
      key: 'boxes',
      label: 'Qtde de caixas',
      selector: ({ boxes }) => boxes,
      width: 150,
      sorter: false
    },
    {
      key: 'delivered',
      label: 'Entregue',
      selector: ({ delivered }) => <Badge color={delivered ? 'green' : 'red'}>{delivered ? 'Sim' : 'Não'}</Badge>,
      width: 150,
      sorter: false
    },
    {
      key: 'actions',
      selector: (invoice) => [
        {
          key: 'details',
          type: 'button',
          icon: 'Eye',
          label: 'Detalhes',
          onClick: () => invoiceDetailsDrawer.open({ invoice })
        },
        {
          key: 'delete',
          type: 'button',
          icon: 'Trash2',
          label: 'Excluír',
          disabled: invoice.delivered,
          onClick: () =>
            confirm({
              title: 'Excluir nota',
              description: `Você tem certeza que deseja excluir a nota ${invoice.number}?`,
              onConfirm: () => deleteInvoice(invoice, { onSuccess: onDelete })
            })
        }
      ]
    }
  ]

  return <Table {...props} value={{ total, ...value }} headers={headers} />
}
