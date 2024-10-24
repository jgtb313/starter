import { DropzoneProps } from '@mantine/dropzone'

import { BaseComponent } from '@/support/types'
import { UploadVariants } from './Upload.styles'

export type UploadProps = BaseComponent<
  {
    name: string
    title: string
    description?: string
    accept?: DropzoneProps['accept']
    maxFiles?: number
    multiple?: boolean
    disabled?: boolean
    onChange?: (files: File[]) => void
  },
  UploadVariants
>

export type UploadRef = {
  open: () => void
}
