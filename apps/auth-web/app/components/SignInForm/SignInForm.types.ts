import { SignInInput } from '@starter/schema'
import { FormProps } from '@starter/ui'

export type ISignInForm = Omit<FormProps<SignInInput>, 'children'> & {
  loading?: boolean
}
