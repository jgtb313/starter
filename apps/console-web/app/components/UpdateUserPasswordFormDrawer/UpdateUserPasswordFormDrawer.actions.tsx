import { drawer, DrawerActions } from '@ss/components'

import { UpdateUserPasswordFormDrawer } from './UpdateUserPasswordFormDrawer'
import { UpdateUserPasswordFormDrawerProps } from './UpdateUserPasswordFormDrawer.types'

export const updateUserPasswordFormDrawer: DrawerActions<UpdateUserPasswordFormDrawerProps> = {
  open: (props) => {
    drawer.open({
      id: 'UpdateUserPasswordFormDrawer',
      children: <UpdateUserPasswordFormDrawer {...props} />,
      padding: true
    })
  },
  close: () => drawer.close('UpdateUserPasswordFormDrawer')
}
