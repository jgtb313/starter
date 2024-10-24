import { ReactNode } from 'react'
import { DefaultMantineColor } from '@mantine/core'
import { NotificationPosition } from '@mantine/notifications/lib/notifications.store'

export type ToastProps = {
  title?: ReactNode
  message: ReactNode
  color?: DefaultMantineColor
  position?: NotificationPosition
}
