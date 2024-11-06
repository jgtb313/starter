import { Flex, Card, Tabs, Button, Typography } from '@ss/components'

import { useApp } from '~/stores'
import { UserProfileProps, UserProfileTabProps } from './UserProfile.types'

const Informations = ({}: UserProfileTabProps) => {
  const { user } = useApp()
  return (
    <Flex direction="column" gap={16}>
      <Card bordered>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Typography>Nome</Typography>

            <Typography c="dimmed">{user.name}</Typography>
          </Flex>

          <Button>Alterar</Button>
        </Flex>
      </Card>

      <Card bordered>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Typography>Email</Typography>

            <Typography c="dimmed">{user.email}</Typography>
          </Flex>

          <Button>Alterar</Button>
        </Flex>
      </Card>
    </Flex>
  )
}

const Security = ({}: UserProfileTabProps) => {
  const { user } = useApp()
  return <></>
}

export const UserProfile = (props: UserProfileProps) => {
  return (
    <Tabs
      {...props}
      items={[
        {
          value: 'informations',
          label: 'Informações',
          icon: 'NotepadText',
          children: <Informations />
        },
        {
          value: 'security',
          label: 'Segurança',
          icon: 'Lock',
          children: <Security />
        }
      ]}
    />
  )
}
