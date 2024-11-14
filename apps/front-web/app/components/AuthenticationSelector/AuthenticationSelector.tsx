import { Button } from '@starter/ui'

import { authenticationFormModal } from '../AuthenticationForm'
import { AuthenticationSelectorProps } from './AuthenticationSelector.types'

export const AuthenticationSelector = ({}: AuthenticationSelectorProps) => {
  return (
    <Button variant="outline" size="md" radius={50} onClick={authenticationFormModal.open}>
      Sign In
    </Button>
  )
}
