import { z, BatchInvoicesSchema, BatchInvoicesInput as IBatchInvoicesInput, BatchInvoicesFileStatusEnum } from '@ss/schema'
import { FormProps } from '@ss/components'

export type BatchInvoiceFormProps = {
  draft?: boolean
  onSubmit?: () => void
  onSuccess?: () => void
}

export type BatchInvoiceFormRef = {
  openUpload: () => void
  reset: () => void
}

export type BatchInvoiceInput = Omit<IBatchInvoicesInput, 'files'> & {
  files: {
    file: any
    filename: string
    message: string
    status: BatchInvoicesFileStatusEnum
  }[]
}

export type IBatchInvoiceForm = FormProps<BatchInvoiceInput>

export const BatchInvoiceFormSchema = BatchInvoicesSchema.omit({ files: true }).and(z.object({ files: z.array(z.any()).min(1) }))
