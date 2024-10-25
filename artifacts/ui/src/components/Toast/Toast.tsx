import { Notifications, showNotification, hideNotification } from '@mantine/notifications'

import { ToastStyles } from './Toast.styles'
import { ToastProps } from './Toast.types'

const show = ({ position = 'bottom-center', ...props }: ToastProps) => {
  const styles = ToastStyles(props)

  const toastId = showNotification({
    classNames: {
      root: styles.root(),
      title: styles.title(),
      description: styles.description(),
    },
    ...props,
    position,
  })

  return toastId
}

export const toast = {
  show,
  close: (toastId: string) => hideNotification(toastId),

  success: (props: Omit<ToastProps, 'color'>) => show({ ...props, color: 'green' }),
  error: (props: Omit<ToastProps, 'color'>) => show({ ...props, color: 'red' }),
  info: (props: Omit<ToastProps, 'color'>) => show({ ...props, color: 'indigo' }),
  warning: (props: Omit<ToastProps, 'color'>) => show({ ...props, color: 'yellow' }),
}

export const ToastProvider = () => <Notifications position="bottom-center" />
