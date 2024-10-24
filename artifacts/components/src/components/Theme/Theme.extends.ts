import { Button, rem, MantineThemeComponents } from '@mantine/core'

export const ThemeExtends: MantineThemeComponents = {
  Button: Button.extend({
    vars: (_, props) => {
      if (props.size === 'lg') {
        return {
          root: {
            '--button-height': rem(52),
            '--button-fz': rem(16)
          }
        }
      }

      return { root: {} }
    }
  })
}
