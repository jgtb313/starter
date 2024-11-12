import { Flex, Button } from '@starter/ui'

import { authenticationFormModal } from '../AuthenticationForm'
import { AuthenticationSelectorProps } from './AuthenticationSelector.types'

export const AuthenticationSelector = ({}: AuthenticationSelectorProps) => {
  return (
    <Flex direction="row" gap={4}>
      <Button onClick={authenticationFormModal.open}>Sign In</Button>
    </Flex>
  )
}
