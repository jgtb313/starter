import { Flex, Tabs, Button, useMount, drawer } from '@ss/components'
import { CreateStoreSchema, CreateUserSchema, CreateStoreInput, CreateUserInput, DocumentTypeCNPJEnum, RoleTypeEnum } from '@ss/schema'

import { useStore, useUser } from '~/stores'
import { StoreList, TeamList, storeFormDrawer, userFormDrawer } from '~/components'
import { SettingsProps } from './Settings.types'

const Stores = () => {
  const { fetchStores, createStore, stores, loadingStores } = useStore()

  useMount(() => {
    fetchStores({})
  })

  return (
    <Flex direction="column" gap={16}>
      <Flex justify="flex-start">
        <Button
          size="lg"
          onClick={() =>
            storeFormDrawer.open<CreateStoreInput>({
              drawerTitle: 'Nova loja',
              submitButtonTitle: 'Adicionar',
              initialValues: {
                name: null,
                rcky: null,
                document: {
                  type: DocumentTypeCNPJEnum.COMPANY,
                  number: null
                }
              },
              schema: CreateStoreSchema,
              onSubmit: (values) => {
                createStore(values, {
                  onSuccess: () => {
                    storeFormDrawer.close()
                  }
                })
              },
              loadingSelector: 'loadingCreateStore'
            })
          }
        >
          Adicionar loja
        </Button>
      </Flex>

      <StoreList items={stores} loading={loadingStores} />
    </Flex>
  )
}

const Team = () => {
  const { stores } = useStore()
  const { fetchUsers, createUser, users, loadingUsers } = useUser()

  useMount(() => {
    fetchUsers({})
  })

  return (
    <Flex direction="column" gap={16}>
      <Flex justify="flex-start">
        <Button
          size="lg"
          onClick={() =>
            userFormDrawer.open<CreateUserInput>({
              type: 'create',
              drawerTitle: 'Novo colaborador',
              submitButtonTitle: 'Adicionar',
              initialValues: {
                name: null,
                email: null,
                password: null,
                relationships:
                  stores?.map((store) => ({
                    storeId: store.id,
                    roleId: null as unknown as RoleTypeEnum
                  })) ?? []
              },
              schema: CreateUserSchema,
              onSubmit: (values) => {
                createUser(values, {
                  onSuccess: () => {
                    drawer.close('UserFormDrawer')
                  }
                })
              },
              loadingSelector: 'loadingCreateUser'
            })
          }
        >
          Adicionar colaborador
        </Button>
      </Flex>

      <TeamList items={users} loading={loadingUsers} />
    </Flex>
  )
}

export const Settings = ({ value = 'stores', onChange }: SettingsProps) => {
  return (
    <Tabs
      value={value}
      items={[
        {
          value: 'stores',
          label: 'Lojas',
          children: <Stores />
        },
        { value: 'team', label: 'Equipe', children: <Team /> }
      ]}
      onChange={onChange}
    />
  )
}
