import { ActionIcon, Icon, useTheme } from '@starter/ui'

import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

export const ToggleColorScheme = ({ size = 'xl' }: ToggleColorSchemeProps) => {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <ActionIcon tooltip="Change theme" variant="default" size={size} onClick={toggleColorScheme}>
      <Icon name={colorScheme === 'light' ? 'Moon' : 'Sun'} />
    </ActionIcon>
  )
}
