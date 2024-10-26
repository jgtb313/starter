import { BaseComponent } from '@/support/types'

export type PillProps = BaseComponent<{
  closable?: boolean
  onRemove?: () => void
}>
