import { User, UpdateUserPasswordInput } from '@ss/schema'
import { FormProps, RequestEvents } from '@ss/components'

export type UpdateUserPasswordFormProps = Pick<FormProps<UpdateUserPasswordInput>, 'initialValues'> & {
  user: User
} & RequestEvents<User, UpdateUserPasswordInput>
