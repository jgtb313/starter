import { PropsWithChildren } from 'react'
import { MantineProvider, createTheme, useMantineColorScheme, MantineColorsTuple } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { generateColors } from '@mantine/colors-generator'

import { useIsMounted, useWatch } from '@/hooks'
import { ThemeExtends } from './Theme.extends'
import { ThemeProps } from './Theme.types'

const DEFAULT_PRIMARY_TUPLE: MantineColorsTuple = generateColors('#0969FF')

const AutoColorScheme = () => {
  const isMounted = useIsMounted()
  const colorScheme = useColorScheme(undefined, { getInitialValueInEffect: false })
  const { setColorScheme } = useMantineColorScheme()

  useWatch(() => {
    if (!isMounted) {
      return
    }

    setColorScheme(colorScheme)
  }, [colorScheme])

  return <></>
}

export const ThemeProvider = ({ colorScheme = 'light', palette, children }: PropsWithChildren<ThemeProps>) => {
  const theme = createTheme({
    primaryColor: 'primary',
    colors: {
      primary: palette?.primary ? generateColors(palette?.primary) : DEFAULT_PRIMARY_TUPLE,
    },
    components: ThemeExtends,
    cursorType: 'pointer',
  })

  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      <AutoColorScheme />

      {children}
    </MantineProvider>
  )
}
