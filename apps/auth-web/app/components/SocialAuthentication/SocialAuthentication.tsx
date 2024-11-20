import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import FacebookOAuthProvider from '@greatsumini/react-facebook-login'
import { SocialSignInEnum } from '@starter/schema'
import { Flex, Button, SocialIcon } from '@starter/ui'

import { SocialAuthenticationProps } from './SocialAuthentication.types'

const SocialAuthenticationWrapper = ({ onSubmit }: SocialAuthenticationProps) => {
  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      onSubmit?.({ context: SocialSignInEnum.GOOGLE, providerToken: access_token })
    },
  })

  return (
    <Flex direction="column" gap={16}>
      <Button variant="default" leftSection={<SocialIcon name="GOOGLE" />} onClick={() => login()}>
        Continue with Google
      </Button>

      <FacebookOAuthProvider
        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
        onSuccess={({ accessToken }) => {
          onSubmit?.({ context: SocialSignInEnum.FACEBOOK, providerToken: accessToken })
        }}
        render={({ onClick }) => (
          <Button variant="default" leftSection={<SocialIcon name="FACEBOOK" />} onClick={onClick}>
            Continue with Facebook
          </Button>
        )}
      />
    </Flex>
  )
}

export const SocialAuthentication = (props: SocialAuthenticationProps) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SocialAuthenticationWrapper {...props} />
    </GoogleOAuthProvider>
  )
}
