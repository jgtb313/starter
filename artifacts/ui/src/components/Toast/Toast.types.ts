import { ReactNode } from 'react'
import { DefaultMantineColor } from '@mantine/core'

export type ToastProps = {
  title?: ReactNode
  message: ReactNode
  color?: DefaultMantineColor
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
}
