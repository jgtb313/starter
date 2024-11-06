import { Drawer, Button, drawer } from '@ss/components'

import { useStore } from '~/stores'
import { StoreForm } from '../StoreForm'
import { StoreFormDrawerProps } from './StoreFormDrawer.types'

export const StoreFormDrawer = <T extends {}>({ drawerTitle, submitButtonTitle, loadingSelector, ...props }: StoreFormDrawerProps<T>) => {
  const loading = useStore((store) => {
    if (loadingSelector) {
      return store[loadingSelector]
    }

    return false
  })

  return (
    <Drawer.Content>
      <Drawer.Header>{drawerTitle}</Drawer.Header>

      <Drawer.Body>
        <StoreForm {...props} />
      </Drawer.Body>

      <Drawer.Footer justify="end">
        <Button color="gray" variant="transparent" onClick={() => drawer.close('StoreFormDrawer')}>
          Cancelar
        </Button>

        <Button form="StoreForm" type="submit" loading={loading}>
          {submitButtonTitle}
        </Button>
      </Drawer.Footer>
    </Drawer.Content>
  )
}
