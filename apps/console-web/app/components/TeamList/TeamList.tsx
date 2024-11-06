import { Table, Flex, Avatar, Typography, confirm, TableHeader } from '@ss/components'
import { UpdateUserSchema, User, UpdateUserInput } from '@ss/schema'

import { useUser } from '~/stores'
import { userFormDrawer } from '../UserFormDrawer'
import { updateUserPasswordFormDrawer } from '../UpdateUserPasswordFormDrawer'
import { UserRoles } from '../UserRoles'
import { TeamListProps } from './TeamList.types'

export const TeamList = ({ ...props }: TeamListProps) => {
  const { updateUser, deleteUser } = useUser()

  const headers: TableHeader<User> = [
    {
      key: 'name',
      label: 'Nome',
      selector: ({ name }) => (
        <Flex direction="row" align="center" gap={8}>
          <Avatar />

          <Typography fz="md">{name}</Typography>
        </Flex>
      ),
      width: 150,
      sorter: false
    },
    {
      key: 'email',
      label: 'E-mail',
      selector: ({ email }) => email,
      width: 150,
      sorter: false
    },
    {
      key: 'roles',
      label: 'Cargos',
      selector: (user) => <UserRoles user={user} />,
      width: 150,
      sorter: false
    },
    {
      key: 'actions',
      selector: (user) => [
        {
          key: 'edit',
          type: 'button',
          icon: 'Pencil',
          label: 'Editar',
          onClick: () =>
            userFormDrawer.open<UpdateUserInput>({
              type: 'edit',
              drawerTitle: 'Editar colaborador',
              submitButtonTitle: 'Salvar',
              initialValues: { ...user, relationships: user.roles.map((role) => ({ storeId: role.storeId, roleId: role.role.type })) },
              schema: UpdateUserSchema,
              loadingSelector: 'loadingUpdateUser',
              onSubmit: (values) => {
                updateUser(values, {
                  onSuccess: () => {
                    userFormDrawer.close()
                  }
                })
              }
            })
        },
        {
          key: 'updatePassword',
          type: 'button',
          icon: 'Lock',
          label: 'Alterar senha',
          onClick: () =>
            updateUserPasswordFormDrawer.open({
              drawerTitle: 'Alterar senha',
              submitButtonTitle: 'Salvar',
              user,
              initialValues: user
            })
        },
        {
          key: 'delete',
          type: 'button',
          icon: 'Unlink2',
          label: 'Desvincular',
          onClick: () =>
            confirm({
              title: 'Desvincular colaborador',
              description: `Você tem certeza que deseja desvincular o colaborador ${user.name}?`,
              onConfirm: () => deleteUser(user)
            })
        }
      ]
    }
  ]

  return <Table {...props} headers={headers} pagination={false} />
}
