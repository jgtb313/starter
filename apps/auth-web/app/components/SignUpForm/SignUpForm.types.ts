import { SignUpInput } from '@starter/schema'
import { FormProps } from '@starter/ui'

export type ISignUpForm = FormProps<SignUpInput>

export type SignUpFormProps = {
  onSubmit?: ISignUpForm['onSubmit']
  loading?: boolean
}
