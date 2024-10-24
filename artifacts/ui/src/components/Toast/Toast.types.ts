import { ReactNode } from 'react'
import { DefaultMantineColor } from '@mantine/core'

export type ToastProps = {
  title?: ReactNode
  color?: DefaultMantineColor
  message: ReactNode
}
