import { Flex, Button, RiGoogleFill, RiFacebookFill } from '@starter/ui-web'

export const SocialAuthForm = () => {
  return (
    <Flex direction="column" gap="md">
      <Button size="sm" variant="outline" leftSection={<RiGoogleFill />}>
        Sign in with Google
      </Button>

      <Button size="sm" variant="outline" leftSection={<RiFacebookFill />}>
        Sign in with Facebook
      </Button>
    </Flex>
  )
}
