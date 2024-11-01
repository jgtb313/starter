import { icons } from '@tabler/icons-react'

import { BaseComponent } from '@/support/types'

export type IconProps = BaseComponent<{
  name: keyof typeof icons
  width?: number
  height?: number
  strokeWidth?: number
}>
