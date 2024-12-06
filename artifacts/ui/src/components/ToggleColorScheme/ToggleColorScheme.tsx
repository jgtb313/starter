import { useTheme } from '../Theme'
import { ActionIcon } from '../ActionIcon'
import { Icon } from '../Icon'
import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

export const ToggleColorScheme = (props: ToggleColorSchemeProps) => {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <ActionIcon {...props} tooltip="Change Theme" onClick={toggleColorScheme}>
      <Icon name={colorScheme === 'light' ? 'Moon' : 'Sun'} />
    </ActionIcon>
  )
}
