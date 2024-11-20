import { SocialSignInInput } from '@starter/schema'
import { FormProps } from '@starter/ui'

export type ISocialAuthentication = FormProps<SocialSignInInput>

export type SocialAuthenticationProps = {
  onSubmit?: ISocialAuthentication['onSubmit']
}
