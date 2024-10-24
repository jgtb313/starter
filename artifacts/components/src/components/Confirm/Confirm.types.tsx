import { BaseComponent } from '@/support/types'
import { ConfirmVariants } from './Confirm.styles'

export type ConfirmProps = BaseComponent<
  {
    title: React.ReactNode
    description: string
    confirmLabel?: string
    cancelLabel?: string
    closable?: boolean
    onConfirm?: () => void
    onCancel?: () => void
  },
  ConfirmVariants
>
