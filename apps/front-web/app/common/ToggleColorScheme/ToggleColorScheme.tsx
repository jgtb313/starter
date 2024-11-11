import { ActionIcon, useTheme } from '@starter/ui'

import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

export const ToggleColorScheme = ({ size = 'sm' }: ToggleColorSchemeProps) => {
  const { colorScheme, toggleColorScheme } = useTheme()

  return <ActionIcon icon={colorScheme === 'light' ? 'Moon' : 'Sun'} color="default" variant="transparent" size={size} onClick={toggleColorScheme} />
}
