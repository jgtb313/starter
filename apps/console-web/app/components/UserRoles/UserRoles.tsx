import { Badge, Flex } from '@ss/components'

import { UserRolesProps } from './UserRoles.types'

export const UserRoles = ({ user }: UserRolesProps) => {
  return (
    <Flex direction="row" gap={8}>
      {user.roles.map(({ store, role }, index) => (
        <Badge key={index}>
          {store.name} • {role.name}
        </Badge>
      ))}
    </Flex>
  )
}
