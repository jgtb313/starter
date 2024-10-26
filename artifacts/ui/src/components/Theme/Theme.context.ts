import { useMantineColorScheme } from '@mantine/core'

import { ThemeColorScheme } from './Theme.types'

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  return {
    colorScheme: colorScheme as ThemeColorScheme,
    changeColorScheme: (value: ThemeColorScheme) => setColorScheme(value),
    toggleColorScheme: () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark'),
  }
}
