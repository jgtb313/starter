import { TextProps, DefaultMantineColor } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type TypographyProps = BaseComponent<{
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'strong' | 'p' | 'small'
  size?: TextProps['size']
  color?: DefaultMantineColor
  fw?: TextProps['fw']
  fs?: TextProps['fs']
  fz?: TextProps['fz']
  lh?: TextProps['lh']
  tt?: TextProps['tt']
  ta?: TextProps['ta']
  td?: TextProps['td']
  mt?: TextProps['mt']
  mb?: TextProps['mb']
  mr?: TextProps['mr']
  ml?: TextProps['ml']
  my?: TextProps['my']
  mx?: TextProps['mx']
  mah?: TextProps['mah']
  mih?: TextProps['mih']
  maw?: TextProps['maw']
  miw?: TextProps['miw']
  c?: TextProps['c']
  truncate?: TextProps['truncate']
  display?: TextProps['display']
}>
