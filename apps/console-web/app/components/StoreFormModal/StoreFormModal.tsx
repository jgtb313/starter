import { Modal, Button, modal } from '@ss/components'

import { useStore } from '~/stores'
import { StoreForm } from '../StoreForm/StoreForm'
import { StoreFormModalProps } from './StoreFormModal.types'

export const StoreFormModal = <T extends {}>({ modalTitle, submitButtonTitle, loadingSelector, ...props }: StoreFormModalProps<T>) => {
  const loading = useStore((store) => {
    if (loadingSelector) {
      return store[loadingSelector]
    }

    return false
  })

  return (
    <Modal.Content>
      <Modal.Header>{modalTitle}</Modal.Header>

      <Modal.Body>
        <StoreForm {...props} />
      </Modal.Body>

      <Modal.Footer>
        <Button color="gray" variant="transparent" onClick={() => modal.close('StoreFormModal')}>
          Cancelar
        </Button>

        <Button form="StoreForm" type="submit" loading={loading}>
          {submitButtonTitle}
        </Button>
      </Modal.Footer>
    </Modal.Content>
  )
}
