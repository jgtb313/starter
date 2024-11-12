import { modal } from '@starter/ui'

import { AuthenticationForm } from './AuthenticationForm'

export const authenticationFormModal = {
  open: () => {
    modal.open({
      id: 'AuthenticationForm',
      size: 'md',
      children: <AuthenticationForm />,
      centered: true,
    })
  },
  close: () => modal.close('AuthenticationForm'),
}
