import { ActionIcon, Icon, useTheme } from '@starter/ui'

import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

export const ToggleColorScheme = (props: ToggleColorSchemeProps) => {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <ActionIcon {...props} onClick={toggleColorScheme}>
      <Icon name={colorScheme === 'light' ? 'Moon' : 'Sun'} />
    </ActionIcon>
  )
}
