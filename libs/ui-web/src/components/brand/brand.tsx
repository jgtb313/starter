import { MantineLogo } from '@mantinex/mantine-logo'
import { useMantineColorScheme, useMantineTheme } from '@mantine/core'

import { BrandProps } from './brand.types'

export const Brand = (props: BrandProps) => {
  const { primaryColor, colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const primary = colorScheme === 'light' ? colors[primaryColor][6] : colors[primaryColor][8]

  return <MantineLogo color={props.color ?? primary} {...props} />
}
