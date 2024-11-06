import { DropzoneProps } from '@mantine/dropzone'

import { BaseComponent } from '@/support/types'

export type UploadProps = BaseComponent<{
  name: string
  title: string
  description?: string
  accept?: DropzoneProps['accept']
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  onChange?: (files: File[]) => void
}>

export type UploadRef = {
  open: () => void
}
