import { ActionIcon, Icon } from '@starter/ui'

import { authenticationFormModal } from '../AuthenticationForm'
import { AuthenticationSelectorProps } from './AuthenticationSelector.types'

export const AuthenticationSelector = ({}: AuthenticationSelectorProps) => {
  return (
    <ActionIcon color="default" size="lg" onClick={authenticationFormModal.open}>
      <Icon name="User" width={20} height={20} />
    </ActionIcon>
  )
}
