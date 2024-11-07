import { Button, Icon, useTheme } from '@starter/ui'

import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

export const ToggleColorScheme = ({ size = 'md' }: ToggleColorSchemeProps) => {
  const { colorScheme, toggleColorScheme } = useTheme()

  return (
    <Button tooltip="Alterar tema" variant="default" size={size} onClick={toggleColorScheme}>
      <Icon name={colorScheme === 'light' ? 'IconMoon' : 'IconSun'} width={24} height={24} strokeWidth={1.5} />
    </Button>
  )
}
