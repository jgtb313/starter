import { icons, LucideProps } from 'lucide-react'

import { BaseComponent } from '@/support/types'

export type IconProps = BaseComponent<{
  name: keyof typeof icons
  width?: LucideProps['width']
  height?: LucideProps['height']
  strokeWidth?: LucideProps['strokeWidth']
}>
