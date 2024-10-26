import { PopoverProps as MPopoverProps } from '@mantine/core'

import { BaseComponent } from '@/support/types'

export type PopoverProps = BaseComponent<{
  opened?: boolean
  width?: MPopoverProps['width']
  position?: MPopoverProps['position']
  arrowPosition?: MPopoverProps['arrowPosition']
  content?: React.ReactNode
  arrow?: boolean
  closeOnClickOutside?: boolean
  onOpen?: () => void
  onClose?: () => void
}>
