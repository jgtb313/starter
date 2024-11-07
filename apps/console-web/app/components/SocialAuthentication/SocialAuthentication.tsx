import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import FacebookOAuthProvider from '@greatsumini/react-facebook-login'
import { Flex, Button, SocialIcon } from '@starter/ui'

const SocialAuthenticationWrapper = () => {
  const login = useGoogleLogin({})

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
  return (
    <GoogleOAuthProvider clientId="915185336820-n9pmjdp0ffpq21q70b82ts89te8ov0ns.apps.googleusercontent.com">
      <FacebookOAuthProvider appId="984133563226449">
        <SocialAuthenticationWrapper />
      </FacebookOAuthProvider>
    </GoogleOAuthProvider>
  )
}
