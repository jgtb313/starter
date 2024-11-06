import { Flex, Dropdown, DropdownProps, Typography, Avatar } from '@ss/components'

import { useApp } from '~/stores'

export const UserMenu = () => {
  const { user, logout } = useApp()

  const items: DropdownProps['items'] = [
    { type: 'link', label: 'Minha conta', icon: 'UserCog', href: '/profile' },
    { type: 'link', label: 'Configurações', icon: 'Settings', href: '/settings' },
    { type: 'divider' },
    { type: 'button', label: 'Sair', icon: 'LogOut', onClick: logout }
  ]

  return (
    <Dropdown width={260} position="bottom-end" trigger="hover" items={items}>
      <Flex justify="space-between" align="center" gap={12}>
        <Avatar radius="xl" size={42} />

        <Flex direction="column">
          <Typography>{user.name}</Typography>

          <Typography size="xs">{user.email}</Typography>
        </Flex>
      </Flex>
    </Dropdown>
  )
}
