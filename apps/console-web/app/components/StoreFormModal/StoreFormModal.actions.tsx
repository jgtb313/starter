import { modal } from '@ss/components'

import { StoreFormModal } from './StoreFormModal'
import { StoreFormModalProps } from './StoreFormModal.types'

export const storeFormModal = {
  open: <T extends {}>(props: StoreFormModalProps<T>) => {
    modal.open({
      id: 'StoreFormModal',
      children: <StoreFormModal {...props} />
    })
  },
  close: () => modal.close('StoreFormModal')
}
