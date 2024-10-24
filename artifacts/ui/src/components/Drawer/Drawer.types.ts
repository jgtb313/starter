import { DrawerProps as ComponentProps } from '@mantine/core'

export type DrawerProps = {
  id: string
  opened?: boolean
  position?: ComponentProps['position']
  size?: ComponentProps['size']
  fullscreen?: boolean
  closable?: boolean
  closeOnClickOutside?: boolean
  padding?: boolean
  children?: ComponentProps['children']
  onClose?: ComponentProps['onClose']
}

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
