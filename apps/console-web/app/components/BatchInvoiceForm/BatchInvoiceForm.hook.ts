import { useRef } from 'react'
import { useDisclosure } from '@ss/components'

import { BatchInvoiceFormRef } from './BatchInvoiceForm.types'

export const useBatchInvoiceDraftForm = () => {
  const batchInvoiceForm = useRef<BatchInvoiceFormRef>(null)
  const [draft, { open: makeDraft, close: makeUndraft }] = useDisclosure(true)

  return {
    batchInvoiceForm,
    draft,
    makeDraft,
    makeUndraft
  }
}
