import { useProfile } from '@starter/store'
import { Flex, Dropdown, DropdownProps, Typography, Avatar } from '@starter/ui'

import { useLogout } from '~/support/use-logout'

export const UserMenu = () => {
  const { user } = useProfile()
  const logout = useLogout()

  const items: DropdownProps['items'] = [
    { type: 'link', label: 'Minha conta', icon: 'IconUserCog', href: '/profile' },
    { type: 'link', label: 'Configurações', icon: 'IconSettings', href: '/settings' },
    { type: 'divider' },
    {
      type: 'button',
      label: 'Sair',
      icon: 'IconLogout',
      onClick: logout,
    },
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
