import { MantineLogo, MantineLogoProps } from '@mantinex/mantine-logo'
import { useMantineColorScheme, useMantineTheme } from '@mantine/core'

export type BrandProps = Pick<MantineLogoProps, 'type' | 'color' | 'size'>

export const Brand = (props: BrandProps) => {
  const { primaryColor, colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const primary = colorScheme === 'light' ? colors[primaryColor][6] : colors[primaryColor][8]

  return <MantineLogo color={props.color ?? primary} {...props} />
}
