import { drawer } from '@ss/components'

import { UserFormDrawer } from './UserFormDrawer'
import { UserFormDrawerProps } from './UserFormDrawer.types'

export const userFormDrawer = {
  open: <T extends {}>(props: UserFormDrawerProps<T>) => {
    drawer.open({
      id: 'UserFormDrawer',
      children: <UserFormDrawer {...props} />,
      padding: true
    })
  },
  close: () => drawer.close('UserFormDrawer')
}
