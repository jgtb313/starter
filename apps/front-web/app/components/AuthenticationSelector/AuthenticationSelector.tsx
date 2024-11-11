import { Flex, Button, Icon } from '@starter/ui'

import { AuthenticationSelectorProps } from './AuthenticationSelector.types'

export const AuthenticationSelector = ({}: AuthenticationSelectorProps) => {
  return (
    <Button size="compact-xl" variant="default" radius="xl">
      <Flex justify="space-between" align="center" gap={16}>
        <Icon name="Menu" width={18} height={18} />

        <Icon name="CircleUser" width={24} height={24} />
      </Flex>
    </Button>
  )
}
