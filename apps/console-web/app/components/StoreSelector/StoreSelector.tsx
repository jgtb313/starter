import { useMemo } from 'react'
import { CreateStoreSchema, CreateStoreInput, DocumentTypeCNPJEnum } from '@ss/schema'
import { Flex, Dropdown, Button, Icon, Typography, modal, DropdownProps } from '@ss/components'

import { useApp, useStore } from '~/stores'
import { storeFormModal } from '../StoreFormModal'
import { StoreSelectorProps } from './StoreSelector.types'
import { uniqBy } from '@ss/shared'

export const StoreSelector = ({}: StoreSelectorProps) => {
  const { updateCurrentStore, user, store: currentStore } = useApp()
  const { createStore, stores } = useStore()
  const dropdownItems: DropdownProps['items'] = useMemo(() => {
    if (stores) {
      return stores.map((store) => ({
        type: 'button',
        label: store.name,
        icon: 'Store',
        rightSection: currentStore.id === store.id && <Icon name="Check" width={18} height={18} />,
        disabled: currentStore.id === store.id,
        onClick: () => updateCurrentStore(store)
      }))
    }

    const userStores: DropdownProps['items'] = user.roles.map((userRole) => ({
      type: 'button',
      label: userRole.store.name,
      icon: 'Store',
      rightSection: currentStore.id === userRole.store.id && <Icon name="Check" width={18} height={18} />,
      disabled: currentStore.id === userRole.store.id,
      onClick: () => updateCurrentStore(userRole.store)
    }))

    return uniqBy(userStores, 'label')
  }, [currentStore, stores])

  return (
    <Dropdown
      width={200}
      position="bottom-start"
      items={[
        { type: 'label', label: 'Lojas' },
        ...dropdownItems,
        { type: 'divider' },
        {
          type: 'button',
          icon: 'Plus',
          label: 'Nova loja',
          onClick: () =>
            storeFormModal.open<CreateStoreInput>({
              modalTitle: 'Nova loja',
              submitButtonTitle: 'Criar loja',
              initialValues: { name: null, rcky: null, document: { type: DocumentTypeCNPJEnum.COMPANY, number: null } },
              schema: CreateStoreSchema,
              onSubmit: (values) => {
                createStore(values, {
                  onSuccess: (store) => {
                    modal.close('StoreFormModal')

                    updateCurrentStore(store)
                  }
                })
              }
            })
        }
      ]}
      arrow
    >
      <Button size="compact-lg" variant="default" radius="lg">
        <Flex direction="row" align="center" gap={16}>
          <Flex direction="row" align="center" gap={12}>
            <Icon name="Store" width={18} height={18} strokeWidth={1.5} />

            <Typography>{currentStore.name}</Typography>
          </Flex>

          <Icon name="ChevronDown" width={18} height={18} strokeWidth={1.5} />
        </Flex>
      </Button>
    </Dropdown>
  )
}
