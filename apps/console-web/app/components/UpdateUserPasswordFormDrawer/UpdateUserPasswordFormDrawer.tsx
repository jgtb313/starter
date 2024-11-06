import { Drawer, Button, drawer } from '@ss/components'

import { useUser } from '~/stores'
import { UpdateUserPasswordForm } from '../UpdateUserPasswordForm'
import { updateUserPasswordFormDrawer } from './UpdateUserPasswordFormDrawer.actions'
import { UpdateUserPasswordFormDrawerProps } from './UpdateUserPasswordFormDrawer.types'

export const UpdateUserPasswordFormDrawer = ({ drawerTitle, submitButtonTitle, ...props }: UpdateUserPasswordFormDrawerProps) => {
  const loading = useUser((store) => store.loadingUpdateUserPassword)

  return (
    <Drawer.Content>
      <Drawer.Header>{drawerTitle}</Drawer.Header>

      <Drawer.Body>
        <UpdateUserPasswordForm {...props} onSuccess={() => updateUserPasswordFormDrawer.close()} />
      </Drawer.Body>

      <Drawer.Footer justify="end">
        <Button color="gray" variant="transparent" onClick={() => drawer.close('UpdateUserPasswordFormDrawer')}>
          Cancelar
        </Button>

        <Button form="UpdateUserPasswordForm" type="submit" loading={loading}>
          {submitButtonTitle}
        </Button>
      </Drawer.Footer>
    </Drawer.Content>
  )
}
