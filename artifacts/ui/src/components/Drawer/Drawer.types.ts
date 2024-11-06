import { PropsWithChildren } from 'react'
import { DrawerProps as ComponentProps } from '@mantine/core'

export type DrawerProps = PropsWithChildren<{
  id: string
  opened?: boolean
  position?: ComponentProps['position']
  size?: ComponentProps['size']
  padding?: boolean
  fullscreen?: boolean
  closeOnClickOutside?: boolean
  onClose?: ComponentProps['onClose']
}>

export type DrawerHeaderProps = {
  description?: string
  closable?: boolean
}

export type DrawerBodyProps = {
  padding?: boolean
}

export type DrawerActions<T> = {
  open: (props: T) => void
  close: () => void
}
