import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import FacebookOAuthProvider from '@greatsumini/react-facebook-login'
import { SocialSignInEnum } from '@starter/schema'
import { useAuth } from '@starter/store'
import { Flex, Button, SocialIcon } from '@starter/ui'
import { useAuthenticate } from '~/support/use-authenticate'

const SocialAuthenticationWrapper = () => {
  const { socialSignIn } = useAuth()
  const authenticate = useAuthenticate()
  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      socialSignIn(
        {
          context: SocialSignInEnum.GOOGLE,
          token: access_token,
        },
        {
          onSuccess: ({ token }) => {
            authenticate(token)
          },
        },
      )
    },
  })

  return (
    <Flex direction="column" gap={16}>
      <Button variant="default" leftSection={<SocialIcon name="GOOGLE" />} onClick={() => login()}>
        Continue with Google
      </Button>

      <Button variant="default" leftSection={<SocialIcon name="FACEBOOK" />}>
        Continue with Facebook
      </Button>
    </Flex>
  )
}

export const SocialAuthentication = () => {
  const { socialSignIn } = useAuth()
  const authenticate = useAuthenticate()

  return (
    <GoogleOAuthProvider clientId="915185336820-n9pmjdp0ffpq21q70b82ts89te8ov0ns.apps.googleusercontent.com">
      <FacebookOAuthProvider
        appId="984133563226449"
        onSuccess={({ accessToken }) => {
          socialSignIn(
            {
              context: SocialSignInEnum.FACEBOOK,
              token: accessToken,
            },
            {
              onSuccess: ({ token }) => {
                authenticate(token)
              },
            },
          )
        }}
      >
        <SocialAuthenticationWrapper />
      </FacebookOAuthProvider>
    </GoogleOAuthProvider>
  )
}
