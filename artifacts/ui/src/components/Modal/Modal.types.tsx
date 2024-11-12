import { ModalProps as ComponentProps, ModalTitleProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type ModalProps = BaseComponent<{
  id: string
  opened?: boolean
  size?: ComponentProps['size']
  closeOnClickOutside?: boolean
  centered?: boolean
  fullscreen?: boolean
  children?: ComponentProps['children']
}>

export type ModalHeaderProps = {
  size?: ModalTitleProps['fz']
  centered?: boolean
  bordered?: boolean
  closable?: boolean
}
