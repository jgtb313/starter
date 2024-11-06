import { UpdateStoreSchema, Store, UpdateStoreInput } from '@ss/schema'
import { Table, confirm, drawer, TableHeader } from '@ss/components'
import { formatToCPFOrCNPJ } from '@ss/shared'

import { useStore } from '~/stores'
import { storeFormDrawer } from '../StoreFormDrawer'
import { StoreListProps } from './StoreList.types'

export const StoreList = ({ ...props }: StoreListProps) => {
  const { updateStore, deleteStore } = useStore()

  const headers: TableHeader<Store> = [
    {
      key: 'name',
      label: 'Nome',
      selector: ({ name }) => name,
      width: 150,
      sorter: false
    },
    {
      key: 'rcky',
      label: 'Código (RCKY)',
      selector: ({ rcky }) => rcky,
      width: 150,
      sorter: false
    },
    {
      key: 'document',
      label: 'CNPJ',
      selector: ({ document }) => formatToCPFOrCNPJ(document.number),
      width: 150,
      sorter: false
    },
    {
      key: 'actions',
      selector: (store) => [
        {
          key: 'update',
          type: 'button',
          icon: 'Pencil',
          label: 'Editar',
          onClick: () => {
            storeFormDrawer.open<UpdateStoreInput>({
              drawerTitle: 'Editar loja',
              submitButtonTitle: 'Salvar',
              initialValues: store,
              schema: UpdateStoreSchema,
              loadingSelector: 'loadingUpdateStore',
              onSubmit: (values) => {
                updateStore(values, {
                  onSuccess: () => {
                    drawer.close('StoreFormDrawer')
                  }
                })
              }
            })
          }
        },
        {
          key: 'delete',
          type: 'button',
          icon: 'Trash2',
          label: 'Excluír',
          onClick: () =>
            confirm({
              title: 'Excluir loja',
              description: `Você tem certeza que deseja excluir a loja ${store.name}?`,
              onConfirm: () => deleteStore(store)
            })
        }
      ]
    }
  ]

  return <Table {...props} headers={headers} pagination={false} />
}
