import { makeAuthRedirectUrl, ClientIdEnum } from '@starter/config'
import { useProfile, ProfileProtected } from '@starter/store'
import { Flex, Dropdown, DropdownProps, Typography, Avatar } from '@starter/ui'

const logoutRedirectUrl = makeAuthRedirectUrl({
  clientId: ClientIdEnum.CONSOLE,
  stage: import.meta.env.VITE_STAGE,
  to: 'logout',
})

export const UserMenu = () => {
  const { user } = useProfile<ProfileProtected>()

  const items: DropdownProps['items'] = [
    { type: 'link', label: 'Account', icon: 'UserCog', href: '/account' },
    { type: 'link', label: 'Settings', icon: 'Settings', href: '/settings' },
    { type: 'divider' },
    {
      type: 'link',
      label: 'Logout',
      icon: 'LogOut',
      href: logoutRedirectUrl,
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
