import { SignInInput } from '@starter/schema'
import { FormProps } from '@starter/ui'

export type ISignInForm = FormProps<SignInInput>

export type SignInFormProps = {
  onSubmit?: ISignInForm['onSubmit']
  loading?: boolean
}
