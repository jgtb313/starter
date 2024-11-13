import { ActionIcon, Icon, useTheme } from '@starter/ui'

import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

export const ToggleColorScheme = ({ size = 'sm' }: ToggleColorSchemeProps) => {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <ActionIcon color="default" variant="transparent" size={size} onClick={toggleColorScheme}>
      <Icon name={colorScheme === 'light' ? 'Moon' : 'Sun'} />
    </ActionIcon>
  )
}
