import { Popover, Flex, Box, Button, Icon } from '@starter/ui'

import { AuthenticationSelectorProps } from './AuthenticationSelector.types'

const Content = () => {
  return <Box></Box>
}

export const AuthenticationSelector = ({}: AuthenticationSelectorProps) => {
  return (
    <Popover content={<Content />}>
      <Button size="compact-xl" variant="default" radius="xl">
        <Flex justify="space-between" align="center" gap={24}>
          <Icon name="Menu" width={20} height={20} />

          <Icon name="CircleUser" width={30} height={30} />
        </Flex>
      </Button>
    </Popover>
  )
}
