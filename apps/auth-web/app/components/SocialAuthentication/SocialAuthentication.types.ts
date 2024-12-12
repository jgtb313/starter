import { SocialSignOnInput } from '@starter/schema'
import { FormProps } from '@starter/ui'

export type ISocialAuthentication = FormProps<SocialSignOnInput>

export type SocialAuthenticationProps = {
  onSubmit?: ISocialAuthentication['onSubmit']
}
