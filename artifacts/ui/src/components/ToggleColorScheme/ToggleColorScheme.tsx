import { Tooltip } from '@mantine/core'

import { useTheme } from '../Theme'
import { ActionIcon } from '../ActionIcon'
import { Icon } from '../Icon'
import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

export const ToggleColorScheme = (props: ToggleColorSchemeProps) => {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <Tooltip label="Change Theme">
      <ActionIcon {...props} onClick={toggleColorScheme}>
        <Icon name={colorScheme === 'light' ? 'Moon' : 'Sun'} />
      </ActionIcon>
    </Tooltip>
  )
}
