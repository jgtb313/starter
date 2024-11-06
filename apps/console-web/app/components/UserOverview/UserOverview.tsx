import { Avatar, Card, Flex, Typography } from '@ss/components'

import { UserOverviewProps } from './UserOverview.types'

export const UserOverview = ({ user }: UserOverviewProps) => {
  return (
    <Card padding="md" bordered>
      <Flex direction="row" gap={16}>
        <Avatar />

        <Flex direction="column" gap={4}>
          <Typography size="lg">{user.name}</Typography>

          <Typography c="dimmed" size="md">
            {user.email}
          </Typography>
        </Flex>
      </Flex>
    </Card>
  )
}
