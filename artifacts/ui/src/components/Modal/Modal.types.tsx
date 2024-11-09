import { ModalProps as ComponentProps } from '@mantine/core'

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
  description?: string
  centered?: boolean
  closable?: boolean
}
