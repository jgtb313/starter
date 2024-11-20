import { SignInInput } from '@starter/schema'
import { FormProps } from '@starter/ui'

import { SocialAuthenticationProps } from '../SocialAuthentication'

export type ISignInForm = FormProps<SignInInput>

export type SignInFormProps = {
  onSubmit?: ISignInForm['onSubmit']
  onSocialSubmit?: SocialAuthenticationProps['onSubmit']
  loading?: boolean
}
