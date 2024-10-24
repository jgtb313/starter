import { TextProps as ComponentProps, DefaultMantineColor } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type TypographyProps = BaseComponent<{
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'strong' | 'p' | 'small'
  size?: ComponentProps['size']
  color?: DefaultMantineColor
  fw?: ComponentProps['fw']
  fs?: ComponentProps['fs']
  fz?: ComponentProps['fz']
  lh?: ComponentProps['lh']
  tt?: ComponentProps['tt']
  ta?: ComponentProps['ta']
  td?: ComponentProps['td']
  mt?: ComponentProps['mt']
  mb?: ComponentProps['mb']
  mr?: ComponentProps['mr']
  ml?: ComponentProps['ml']
  my?: ComponentProps['my']
  mx?: ComponentProps['mx']
  mah?: ComponentProps['mah']
  mih?: ComponentProps['mih']
  maw?: ComponentProps['maw']
  miw?: ComponentProps['miw']
  c?: ComponentProps['c']
  truncate?: ComponentProps['truncate']
  display?: ComponentProps['display']
}>
