import { BooleanKeys } from '@ss/shared'

import { StoreState } from '~/stores'
import { StoreFormProps } from '../StoreForm/StoreForm.types'

export type StoreFormDrawerProps<T> = StoreFormProps<T> & {
  drawerTitle: string
  submitButtonTitle: string
  loadingSelector?: BooleanKeys<StoreState>
}
