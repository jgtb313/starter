import { TextInputProps as ComponentProps } from '@mantine/core'
import { DocumentTypeEnum } from '@starter/schema'

import { BaseComponent } from '@/support/types'

export type DocumentInputProps = BaseComponent<{
  name: string
  type?: 'CPF' | 'CNPJ' | 'BOTH'
  defaultType?: DocumentTypeEnum
  label?: string
  placeholder?: string
  size?: ComponentProps['size']
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  hint?: string
  exclusive?: boolean
  descritive?: boolean
  readOnly?: boolean
  onChange?: (input: { type?: DocumentTypeEnum; number?: string }) => void
  onBlur?: () => void
}>
