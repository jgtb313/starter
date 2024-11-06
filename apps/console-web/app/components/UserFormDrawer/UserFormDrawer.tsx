import { Drawer, Button, drawer } from '@ss/components'

import { useUser } from '~/stores'
import { UserForm } from '../UserForm'
import { UserFormDrawerProps } from './UserFormDrawer.types'

export const UserFormDrawer = <T extends {}>({ drawerTitle, submitButtonTitle, loadingSelector, ...props }: UserFormDrawerProps<T>) => {
  const loading = useUser((store) => {
    if (loadingSelector) {
      return store[loadingSelector]
    }

    return false
  })

  return (
    <Drawer.Content>
      <Drawer.Header>{drawerTitle}</Drawer.Header>

      <Drawer.Body>
        <UserForm {...props} />
      </Drawer.Body>

      <Drawer.Footer justify="end">
        <Button color="gray" variant="transparent" onClick={() => drawer.close('UserFormDrawer')}>
          Cancelar
        </Button>

        <Button form="UserForm" type="submit" loading={loading}>
          {submitButtonTitle}
        </Button>
      </Drawer.Footer>
    </Drawer.Content>
  )
}
