import { Drawer, Button, drawer } from '@ss/components'

import { useApp, useInvoice } from '~/stores'
import { BatchInvoiceForm, useBatchInvoiceDraftForm } from '../BatchInvoiceForm'
import { BatchInvoiceFormDrawerProps } from './BatchInvoiceFormDrawer.types'

export const BatchInvoiceFormDrawer = ({ onSuccess }: BatchInvoiceFormDrawerProps) => {
  const { store } = useApp()
  const { loadingBatchInvoice } = useInvoice()
  const { batchInvoiceForm, draft, makeDraft, makeUndraft } = useBatchInvoiceDraftForm()

  const handleUpload = () => {
    makeDraft()

    queueMicrotask(() => {
      batchInvoiceForm.current?.reset()
      batchInvoiceForm.current?.openUpload()
    })
  }

  return (
    <Drawer.Content>
      <Drawer.Header description={store.name}>Adicionar notas</Drawer.Header>

      <Drawer.Body>
        <BatchInvoiceForm ref={batchInvoiceForm} draft={draft} onSubmit={makeUndraft} onSuccess={onSuccess} />
      </Drawer.Body>

      <Drawer.Footer justify={draft ? 'end' : 'center'}>
        {draft && (
          <Button color="gray" variant="transparent" onClick={() => drawer.close('BatchInvoicesFormDrawer')}>
            Cancelar
          </Button>
        )}

        {draft && (
          <Button form="BatchInvoiceForm" type="submit" loading={loadingBatchInvoice}>
            Enviar
          </Button>
        )}

        {!draft && <Button onClick={handleUpload}>Carregar novos arquivos</Button>}
      </Drawer.Footer>
    </Drawer.Content>
  )
}
