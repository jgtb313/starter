import { BooleanKeys } from '@ss/shared'

import { UserState } from '~/stores'
import { UserFormProps } from '../UserForm/UserForm.types'

export type UserFormDrawerProps<T> = UserFormProps<T> & {
  drawerTitle: string
  submitButtonTitle: string
  loadingSelector?: BooleanKeys<UserState>
}
