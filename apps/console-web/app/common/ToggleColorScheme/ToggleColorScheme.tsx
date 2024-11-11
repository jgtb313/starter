import { ActionIcon, Button, Icon, useTheme } from '@starter/ui'

import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

export const ToggleColorScheme = ({ size = 'xl' }: ToggleColorSchemeProps) => {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <ActionIcon icon={colorScheme === 'light' ? 'Moon' : 'Sun'} tooltip="Change theme" variant="default" size={size} onClick={toggleColorScheme} />
  )
}
